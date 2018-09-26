// @flow
import * as _ from "lodash";
import * as React from "react";
import {StyleSheet, View, Dimensions, Animated, Slider, ActivityIndicator} from "react-native";
import {LinearGradient} from "expo";
import {SafeAreaView} from "react-navigation";

import {IconButton, StyleGuide, withTheme, type ThemeProps} from "../../components";

import type {Track, Playlist} from "../api";

import PlayerProvider, {withPlayer, type PlayerProps} from "./Player";

type InjectedProps = ThemeProps & PlayerProps;
type ExpandedPlayerControlsProps = InjectedProps & {
    playlist: Playlist,
    track: Track,
    switchTrack: Track => mixed
};

type ExpandedPlayerControlsState = {
    repeat: boolean,
    shuffleMode: boolean
};

class ExpandedPlayerControls extends React.Component<ExpandedPlayerControlsProps, ExpandedPlayerControlsState> {

    state = {
        repeat: false,
        shuffleMode: false
    };

    toggleRepeat = () => {
        this.setState({ repeat: !this.state.repeat });
    }

    toggleShuffleMode = () => {
        this.setState({ shuffleMode: !this.state.shuffleMode });
    }

    shuffle = async (): Promise<void> => {
        const playerProvider = PlayerProvider.getInstance();
        const {playlist, switchTrack} = this.props;
        const entry = await playerProvider.shuffle(playlist);
        switchTrack(entry.track);
    }

    replay = () => {
        const playerProvider = PlayerProvider.getInstance();
        const {playlist, track} = this.props;
        const entry = _.find(playlist.entries, e => e.track.uri === track.uri);
        playerProvider.play(playlist, entry);
    }

    play = async (): Promise<void> => {
        const playerProvider = PlayerProvider.getInstance();
        const {playlist, track, switchTrack} = this.props;
        const entry = _.find(playlist.entries, e => e.track.uri === track.uri);
        await playerProvider.play(playlist, entry);
        switchTrack(track);
    }

    updateVolume = _.throttle((volume: number) => {
        const playerProvider = PlayerProvider.getInstance();
        playerProvider.sound.setVolumeAsync(volume);
    }, 100);

    render(): React.Node {
        const playerProvider = PlayerProvider.getInstance();
        const {playlist, track, player, theme} = this.props;
        const {repeat, shuffleMode} = this.state;
        const entry = _.find(playlist.entries, e => e.track.uri === track.uri);
        const isSongPlaying = playerProvider.isSongPlaying(playlist, entry);
        const translateX = isSongPlaying ? player.progress.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0]
        }) : -width;
        return (
            <View>
                <AnimatedLinearGradient
                    colors={["white", theme.palette.secondary]}
                    style={[styles.progress, { transform: [{ translateX }]}]}
                />
                <SafeAreaView>
                    <View style={styles.buttons}>
                        <IconButton
                            name="repeat"
                            disabled={!isSongPlaying}
                            onPress={this.toggleRepeat}
                            secondary={!repeat}
                            primary={repeat}
                        />
                        <IconButton
                            name="previous"
                            disabled={!isSongPlaying || !player.isLoaded}
                            onPress={this.replay}
                            primary
                        />
                        {
                            (player.isLoaded || !isSongPlaying) && (
                                <IconButton
                                    name={(isSongPlaying && player.isPlaying) ? "pause" : "play"}
                                    onPress={isSongPlaying ? playerProvider.toggle : this.play}
                                    primary
                                />
                            )
                        }
                        {
                            (!player.isLoaded && isSongPlaying) && (
                                <ActivityIndicator color={theme.palette.primary} />
                            )
                        }
                        <IconButton
                            name="next"
                            disabled={!isSongPlaying || !player.isLoaded}
                            onPress={this.shuffle}
                            primary
                        />
                        <IconButton
                            name="shuffle"
                            disabled={!isSongPlaying}
                            onPress={this.toggleShuffleMode}
                            secondary={!shuffleMode}
                            primary={shuffleMode}
                        />
                    </View>
                    <Slider
                        value={1}
                        minimumValue={0}
                        maximumValue={1}
                        onValueChange={this.updateVolume}
                        minimumTrackTintColor={theme.palette.primary}
                        maximumTrackTintColor={theme.palette.secondary}
                        disabled={!playerProvider.sound}
                        style={styles.slider}
                        thumbTintColor={theme.palette.primary}
                    />
                    <Animated.View
                        style={[
                            styles.progressBar, { borderColor: theme.palette.primary, transform: [{ translateX }] }
                        ]}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const {width} = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const styles = StyleSheet.create({
    progress: {
        ...StyleSheet.absoluteFillObject
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: StyleGuide.spacing.base,
        marginHorizontal: StyleGuide.spacing.small
    },
    slider: {
        marginVertical: StyleGuide.spacing.base,
        marginHorizontal: StyleGuide.spacing.small
    },
    progressBar: {
        borderBottomWidth: 2,
        width
    }
});


export default withTheme(withPlayer(ExpandedPlayerControls));
