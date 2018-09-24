// @flow
import * as React from "react";
import {View, StyleSheet, ActivityIndicator, Animated, Dimensions, TouchableWithoutFeedback} from "react-native";
import {LinearGradient} from "expo";

import {IconButton, Text, Image, withTheme} from "../../components";
import {StyleGuide, type ThemeProps} from "../../components/theme";

import PlayerActionSheet from "./PlayerActionSheet";
import PlayerProvider, {withPlayer, type PlayerProps} from "./Player";

type PlayerControlsProps = PlayerProps & ThemeProps;

class PlayerControls extends React.Component<PlayerControlsProps> {

    playerActionSheet: PlayerActionSheet;

    setPlayerActionSheet = (playerActionSheet: ?PlayerActionSheet) => {
        if (playerActionSheet) {
            this.playerActionSheet = playerActionSheet;
        }
    }

    toggle = () => {
        const {player} = this.props;
        if (player.playlistEntry && player.playlist) {
            this.playerActionSheet.toggle(player.playlist, player.playlistEntry.track);
        }
    }

    render(): React.Node {
        const {theme, player} = this.props;
        const {isLoaded, sliding, progress, playlistEntry, isPlaying, playlist} = player;
        const playerProvider = PlayerProvider.getInstance();
        const translateY = sliding.interpolate({
            inputRange: [0, 64],
            outputRange: [-64, 64]
        });
        const translateX = progress.interpolate({
            inputRange: [0, width],
            outputRange: [-width, 0]
        });
        const borderColor = theme.palette.primary;
        return (
            <Animated.View style={[styles.container, { transform: [{ translateY }]}]}>
                <AnimatedLinearGradient
                    colors={["white", theme.palette.secondary]}
                    style={[styles.progress, { borderColor, transform: [{ translateX }]}]}
                />
                <TouchableWithoutFeedback onPress={this.toggle}>
                    <View style={styles.controls}>
                        {
                            !isLoaded && (
                                <ActivityIndicator color={theme.palette.primary} />
                            )
                        }
                        {
                            isLoaded && (
                                <View style={styles.item}>
                                    <IconButton
                                        name={isPlaying ? "pause" : "play"}
                                        color={theme.palette.primary}
                                        onPress={playerProvider.toggle}
                                    />
                                </View>
                            )
                        }
                        {
                            playlistEntry && (
                                <View style={styles.item}>
                                    <Text type="headline" primary>{playlistEntry.track.name}</Text>
                                    <Text type="footnote" primary>{playlistEntry.album.artist}</Text>
                                </View>
                            )
                        }
                        {
                            playlistEntry && (
                                <Image style={styles.cover} {...playlistEntry.album.picture} />
                            )
                        }
                    </View>
                </TouchableWithoutFeedback>
                {
                    playlist && (
                        <PlayerActionSheet ref={this.setPlayerActionSheet} playlist={playlist} />
                    )
                }
            </Animated.View>
        );
    }
}

const {width} = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        backgroundColor: StyleGuide.palette.white,
        ...StyleGuide.styles.shadow
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.base,
        flex: 1
    },
    progress: {
        ...StyleSheet.absoluteFillObject,
        borderBottomWidth: 2
    },
    item: {
        alignItems: "center",
        justifyContent: "center",
        height: 64
    },
    cover: {
        height: 44,
        width: 44
    }
});

export default withTheme(withPlayer(PlayerControls));
