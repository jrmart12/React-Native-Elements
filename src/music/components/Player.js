// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {observable, action} from "mobx";
import {inject} from "mobx-react/native";
import {Animated, Dimensions} from "react-native";
import {Audio} from "expo";

import type {PlaybackStatus} from "expo/src/av/AV";
import type {Album, Track} from "../api";

type CompositeAnimation = {
    start: () => void,
    stop: () => void
};

export default class Player {

    progressAnimation: CompositeAnimation;
    sound: Audio.Sound;
    durationLeftMillis = 0;

    @observable sliding: Animated.Value = new Animated.Value(64);
    @observable progress: Animated.Value = new Animated.Value(0);

    @observable album: ?Album;
    @observable track: ?Track;
    @observable isLoaded = false;
    @observable isPlaying = false;
    @observable locked = false;

    @action lock() { this.locked = true; }
    @action unlock() { this.locked = false; }
    @action resetProgress() { this.progress = new Animated.Value(0); }

    play(album: Album, track: Track) {
        if (!this.locked) {
            this.load(album, track);
        }
    }

    @action
    async load(album: Album, track: Track): Promise<void> {
        this.lock();
        const {uri} = track;
        Animated.timing(this.sliding, { duration: 300, toValue: 0, useNativeDriver }).start();
        this.album = album;
        this.track = track;
        if (this.sound) {
            this.resetProgress();
            await this.sound.unloadAsync();
        }
        const {sound, status} = await Audio.Sound.create({ uri }, { shouldPlay: true }, this.statusUpdate, false);
        this.sound = sound;
        if (status.durationMillis) {
            const duration = status.durationMillis;
            this.progressAnimation = Animated.timing(this.progress, { duration, toValue: width, useNativeDriver });
            this.progressAnimation.start();
        }
    }

    isAlbumPlaying(album: Album): boolean {
        return this.isPlaying && this.album != null && this.album.id === album.id;
    }

    isSongPlaying(track: Track): boolean {
        return this.track != null && this.track.uri === track.uri;
    }

    @autobind
    async toggle(): Promise<void> {
        if (this.isPlaying) {
            await this.sound.pauseAsync();
            this.progressAnimation.stop();
        } else {
            await this.sound.playAsync();
            const duration = this.durationLeftMillis;
            this.progressAnimation = Animated.timing(this.progress, { duration, toValue: width, useNativeDriver });
            this.progressAnimation.start();
        }
    }

    @autobind @action
    statusUpdate(status: PlaybackStatus) {
        this.isLoaded = status.isLoaded;
        if (status.isLoaded) {
            this.isLoaded = !status.isBuffering;
            this.isPlaying = status.isPlaying;
            if (this.isLoaded && this.locked) {
                this.unlock();
            }
            if (status.durationMillis) {
                this.durationLeftMillis = status.durationMillis - status.positionMillis;
            }
            if (status.didJustFinish) {
                this.resetProgress();
                this.sliding = new Animated.Value(64);
                this.album = undefined;
                this.track = undefined;
            }
        }
    }
}

export type PlayerProps = {
    player: Player
};

// eslint-disable-next-line max-len
export function withPlayer<Props: {}, Comp: React.ComponentType<Props>>(C: Comp): React.ComponentType<$Diff<React.ElementConfig<Comp>, PlayerProps>> {
    return inject("player")(C);
}

const useNativeDriver = true;
const {width} = Dimensions.get("window");
