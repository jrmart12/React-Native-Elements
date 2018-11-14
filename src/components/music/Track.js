// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, IconButton, StyleGuide} from "../../components";

import type {Playlist, Track} from "./Model";

type TrackProps = {
    index: number,
    playlist: Playlist,
    track: Track,
    onPress: (Playlist, Track) => mixed
};

export default class TrackComp extends React.PureComponent<TrackProps> {

    onPress = () => {
        const {playlist, track, onPress} = this.props;
        onPress(playlist, track);
    }

    render(): React.Node {
        const {onPress} = this;
        const {track, index} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.step}>{`${index}`}</Text>
                <Text style={styles.track}>{track.name}</Text>
                <IconButton name="options" primary {...{onPress}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    step: {
        marginRight: StyleGuide.spacing.small,
        color: StyleGuide.palette.darkGray
    },
    track: {
        marginRight: StyleGuide.spacing.small,
        flex: 1,
        flexWrap: "wrap"
    }
});
