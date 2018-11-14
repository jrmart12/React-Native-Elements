// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, type NavigationProps} from "../components";

import MusicAPI from "./api";
import type {Playlist as PlaylistModel} from "../components/music/Model";
import {Playlist, withPlayer, type PlayerProps} from "../components/music";

class Library extends React.Component<PlayerProps & NavigationProps<>> {

    renderItem = (playlist: PlaylistModel): React.Node => {
        const {navigation} = this.props;
        return <Playlist {...{playlist, navigation}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = MusicAPI.playlists;
        const title = "Discovery";
        return (
            <Feed {...{data, renderItem, title, navigation}} style={styles.content} />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small + 64
    }
});

export default withPlayer(Library);
