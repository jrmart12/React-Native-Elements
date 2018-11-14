// @flow
/* eslint-disable react/no-unused-state */
import * as _ from "lodash";

import * as React from "react";
import {Animated, Dimensions} from "react-native";
import {Audio} from "expo";

import type {Playlist, PlaylistEntry} from "./Model";

type PlaybackStatus =
  | {
      isLoaded: false,
      androidImplementation?: string,
      error?: string // populated exactly once when an error forces the object to unload
    }
  | {
      isLoaded: true,
      androidImplementation?: string,

      uri: string,

      progressUpdateIntervalMillis: number,
      durationMillis?: number,
      positionMillis: number,
      playableDurationMillis?: number,
      seekMillisToleranceBefore?: number,
      seekMillisToleranceAfter?: number,

      shouldPlay: boolean,
      isPlaying: boolean,
      isBuffering: boolean,

      rate: number,
      shouldCorrectPitch: boolean,
      volume: number,
      isMuted: boolean,
      isLooping: boolean,

      didJustFinish: boolean // true exactly once when the track plays to finish
    };


type CompositeAnimation = {
    start: () => void,
    stop: () => void
};

// $FlowFixMe
const PlayerContext = React.createContext();

type PlayerProviderProps = {
    children: React.Node
};

type PlayerProviderState = {
    sliding: Animated.Value,
    progress: Animated.Value,
    playlist: Playlist | null,
    playlistEntry: PlaylistEntry | null,
    isLoaded: boolean,
    isPlaying: boolean,
    locked: boolean,
    volume: number
};

Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    shouldDuckAndroid: false,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: true
});

export default class PlayerProvider extends React.Component<PlayerProviderProps, PlayerProviderState> {

  static instance: PlayerProvider | null = null;

    progressAnimation: CompositeAnimation;
    sound: Audio.Sound;
    durationLeftMillis = 0;

    state = {
        sliding: new Animated.Value(64),
        progress: new Animated.Value(0),
        isLoaded: false,
        isPlaying: false,
        locked: false,
        volume: 0,
        playlist: null,
        playlistEntry: null
    };

    static getInstance(): PlayerProvider {
        if (!PlayerProvider.instance) {
            throw new Error("PlayerProvider is not mounted yet.");
        }
        return PlayerProvider.instance;
    }

    componentDidMount() {
        if (PlayerProvider.instance !== null) {
            throw new Error("Only one PlayerProvider is allowed to be used.");
        }
        PlayerProvider.instance = this;
    }

    lock() { this.setState({ locked: true }); }
    unlock() { this.setState({ locked: false }); }
    resetProgress() { this.setState({ progress: new Animated.Value(0) }); }

    async play(playlist: Playlist, playlistEntry: PlaylistEntry): Promise<void> {
        const {locked} = this.state;
        if (!locked) {
            this.load(playlist, playlistEntry);
        }
    }

    async load(playlist: Playlist, playlistEntry: PlaylistEntry): Promise<void> {
        const {sliding, progress} = this.state;
        this.lock();
        const {uri} = playlistEntry.track;
        Animated.timing(sliding, { duration: 300, toValue: 0, useNativeDriver }).start();
        this.setState({ playlist, playlistEntry });
        if (this.sound) {
            this.resetProgress();
            await this.sound.unloadAsync();
        }
        const {sound, status} = await Audio.Sound.createAsync({ uri }, { shouldPlay: true }, this.statusUpdate, false);
        this.sound = sound;
        if (status.durationMillis) {
            const duration = status.durationMillis;
            this.progressAnimation = Animated.timing(progress, { duration, toValue: width, useNativeDriver });
            this.progressAnimation.start();
        }
    }

    async shuffle(playlist: Playlist): Promise<PlaylistEntry> {
        const selectedEntry = _.sample(playlist.entries.filter(entry => !this.isSongPlaying(playlist, entry)));
        await this.play(playlist, selectedEntry);
        return selectedEntry;
    }

    isPlaylistPlaying(playlist: Playlist): boolean {
        const {isPlaying} = this.state;
        return isPlaying && this.state.playlist != null && this.state.playlist.id === playlist.id;
    }

    isSongPlaying(playlist: Playlist, playlistEntry: PlaylistEntry): boolean {
        return this.state.playlist != null && this.state.playlistEntry != null &&
         playlist.id === this.state.playlist.id &&
         this.state.playlistEntry.track.uri === playlistEntry.track.uri;
    }

    toggle = async (): Promise<void> => {
        const {progress, isPlaying} = this.state;
        if (isPlaying) {
            await this.sound.pauseAsync();
            this.progressAnimation.stop();
        } else {
            await this.sound.playAsync();
            const duration = this.durationLeftMillis;
            this.progressAnimation = Animated.timing(progress, { duration, toValue: width, useNativeDriver });
            this.progressAnimation.start();
        }
    }

    statusUpdate = (status: PlaybackStatus) => {
        this.setState({ isLoaded: status.isLoaded });
        if (status.isLoaded) {
            this.setState({ volume: status.volume, isPlaying: status.isPlaying || status.isBuffering });
            if (this.state.isLoaded && this.state.locked) {
                this.unlock();
            }
            if (status.durationMillis) {
                this.durationLeftMillis = status.durationMillis - status.positionMillis;
            }
            if (status.didJustFinish) {
                this.resetProgress();
                this.setState({
                    sliding: new Animated.Value(64),
                    playlist: null,
                    playlistEntry: null
                });
            }
        }
    }

    render(): React.Node {
        const {children} = this.props;
        return (
            <PlayerContext.Provider value={this.state}>
                {children}
            </PlayerContext.Provider>

        );
    }
}

export type PlayerProps = {
    player: PlayerProviderState
};

// eslint-disable-next-line max-len
export function withPlayer<Props: {}, Comp: React.ComponentType<Props>>(C: Comp): React.ComponentType<$Diff<React.ElementConfig<Comp>, PlayerProps>> {
    return props => (
        <PlayerContext.Consumer>
            {player => <C {...{ player }} {...props} />}
        </PlayerContext.Consumer>
    );
}

const useNativeDriver = true;
const {width} = Dimensions.get("window");
