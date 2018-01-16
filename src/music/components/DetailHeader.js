// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Button, StyleGuide, Image, Text, notImplementedYet} from "../../components";
import {withPlayer, type PlayerProps} from "./Player";
import MusicAPI, {type Album} from "../api";

type DetailHeaderProps = PlayerProps & {
    album: Album
};

class DetailHeader extends React.Component<DetailHeaderProps> {

    @autobind
    play() {
        const {album} = this.props;
        const tracks = MusicAPI.tracks(album.id);
        this.props.player.play(tracks[0].uri);
    }

    render(): React.Node {
        const {album} = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Image {...album.picture} style={styles.image} />
                    <View>
                        <Text type="headline">{album.name}</Text>
                        <Text type="footnote">{album.artist}</Text>
                    </View>
                </View>
                <View style={styles.controls}>
                    <View style={styles.leftControl}>
                        <Button icon="play" secondary={true} onPress={this.play} />
                    </View>
                    <View style={styles.rightControl}>
                        <Button icon="shuffle" secondary={true} onPress={notImplementedYet} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...StyleGuide.styles.shadow,
        zIndex: 1000
    },
    header: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    image: {
        width: 80,
        height: 80,
        marginRight: StyleGuide.spacing.small
    },
    controls: {
        flexDirection: "row",
        paddingHorizontal: StyleGuide.spacing.small
    },
    leftControl: {
        flex: 1,
        marginRight: StyleGuide.spacing.tiny
    },
    rightControl: {
        flex: 1,
        marginLeft: StyleGuide.spacing.tiny
    }
});

export default withPlayer(DetailHeader);
