// @flow

import * as React from "react";
import {StyleSheet} from "react-native";

import {Container, NavigationBar, Content, List, StyleGuide} from "../components";

import {type Album, type Playlist as PlaylistModel, type Track as TrackModel} from "../components/music/Model";
import {Track, PlaylistHeader, PlayerActionSheet} from "../components/music";
import type {NavigationProps} from "../components";

import MusicAPI from "./api";

export default class AlbumScreen extends React.PureComponent<NavigationProps<{ album: Album, back: string }>> {

    // TODO: createRef()
    playerActionSheet: PlayerActionSheet;

    setPlayerActionSheet = (playerActionSheet: ?PlayerActionSheet) => {
        if (playerActionSheet) {
            this.playerActionSheet = playerActionSheet;
        }
    }

    toggle = (playlist: PlaylistModel, track: TrackModel) => {
        this.playerActionSheet.toggle(playlist, track);
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {album, back} = navigation.state.params;
        const tracks = MusicAPI.tracks(album.id);
        const playlist = MusicAPI.transformAlbumToPlaylist(album);
        return (
            <Container>
                <NavigationBar {...{navigation, back}} />
                <PlaylistHeader {...{playlist}} />
                <Content style={styles.gutter}>
                    <List
                        rows={tracks}
                        renderRow={(track, i) => <Track index={i + 1} onPress={this.toggle} {...{playlist, track}} />}
                    />
                </Content>
                <PlayerActionSheet ref={this.setPlayerActionSheet} {...{playlist}} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small,
        paddingBottom: StyleGuide.spacing.small + 64
    }
});
