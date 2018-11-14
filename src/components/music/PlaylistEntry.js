// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, IconButton, Image, StyleGuide} from "../../components";

import type {Playlist, Track, PlaylistEntry} from "./Model";

type TrackProps = {
    playlist: Playlist,
    entry: PlaylistEntry,
    onPress: (Playlist, Track) => mixed
};

export default class TrackComp extends React.PureComponent<TrackProps> {

    onPress = () => {
        const {onPress, playlist, entry} = this.props;
        onPress(playlist, entry.track);
    }

    render(): React.Node {
        const {onPress} = this;
        const {entry} = this.props;
        return (
            <View style={styles.container}>
                <Image style={styles.image} {...entry.album.picture} />
                <View style={styles.metadata}>
                    <Text numberOfLines={1}>{entry.track.name}</Text>
                    <Text type="footnote" numberOfLines={1}>{entry.album.artist}</Text>
                </View>
                <IconButton name="options" onPress={onPress} primary />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.tiny
    },
    image: {
        height: 36,
        width: 36,
        marginRight: StyleGuide.spacing.tiny,
        ...StyleGuide.styles.borderRadius
    },
    metadata: {
        flex: 1
    }
});
