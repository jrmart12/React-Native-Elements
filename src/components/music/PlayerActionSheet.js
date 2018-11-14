// @flow
import * as _ from "lodash";

import * as React from "react";
import {StyleSheet} from "react-native";

import {ActionSheet, Image, StyleGuide} from "../../components";
import ExpandedPlayerControls from "./ExpandedPlayerControls";

import {type Playlist, type Track} from "./Model";

type PlayerActionSheetProps = {
};

type PlayerActionSheetState = {
    playlist: Playlist | null,
    track: Track | null
};

export default class PlayerActionSheet extends React.Component<PlayerActionSheetProps, PlayerActionSheetState> {

    // $FlowFixMe
    actionSheet = React.createRef();

    state: $Shape<PlayerActionSheetState> = {};

    toggle(playlist: Playlist, track: Track) {
        this.setState({ playlist, track }, () => this.actionSheet.current.toggle());
    }

    switchTrack = (track: Track) => {
        this.setState({ track });
    }

    render(): React.Node {
        const {switchTrack} = this;
        const {playlist, track} = this.state;
        if (!playlist || !track) {
            return null;
        }
        const title = track ? track.name : "";
        const {album} = _.find(playlist.entries, entry => entry.track.uri === track.uri);
        const subtitle = `${album.artist} - ${album.name}`;
        return (
            <ActionSheet ref={this.actionSheet} {...{title, subtitle}} noSafeArea>
                <Image style={styles.image} {...album.picture} />
                <ExpandedPlayerControls {...{playlist, track, switchTrack}} />
            </ActionSheet>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 311,
        width: 311,
        alignSelf: "center",
        margin: StyleGuide.spacing.small,
        ...StyleGuide.styles.borderRadius
    }
});
