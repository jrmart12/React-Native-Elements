// @flow
import * as React from "react";
import {View, StyleSheet, ActivityIndicator, Animated, Dimensions} from "react-native";
import {observer} from "mobx-react/native";
import {LinearGradient} from "expo";

import {IconButton, Text, Image} from "../../components";
import {StyleGuide, withTheme, type ThemeProps} from "../../components/theme";

import {withPlayer, type PlayerProps} from "./Player";

type PlayerControlsProps = PlayerProps & ThemeProps;

@observer
class PlayerControls extends React.Component<PlayerControlsProps> {

    render(): React.Node {
        const {player, theme} = this.props;
        const translateY = player.sliding.interpolate({
            inputRange: [0, 64],
            outputRange: [-64, 64]
        });
        const translateX = player.progress.interpolate({
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
                <View style={styles.controls}>
                    {
                        !player.isLoaded && (
                            <ActivityIndicator color={theme.palette.primary} />
                        )
                    }
                    {
                        player.isLoaded && (
                            <IconButton
                                name={player.isPlaying ? "pause" : "play"}
                                color={theme.palette.primary}
                                onPress={player.toggle}
                            />
                        )
                    }
                    {
                        (player.album && player.track) && (
                            <View style={styles.title}>
                                <Text type="headline" primary>{player.track.name}</Text>
                                <Text type="footnote" primary>{player.album.artist}</Text>
                            </View>
                        )
                    }
                    {
                        player.album && (
                            <Image style={styles.cover} {...player.album.picture} />
                        )
                    }
                </View>
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
        backgroundColor: "white",
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
    title: {
        alignItems: "center"
    },
    cover: {
        height: 44,
        width: 44
    }
});

export default withPlayer(withTheme(PlayerControls));
