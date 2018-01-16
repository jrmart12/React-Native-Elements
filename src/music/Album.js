// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {Container, NavigationBar, Content, List, StyleGuide} from "../components";

import MusicAPI from "./api";
import {Track, DetailHeader} from "./components";

import type {NavigationProps} from "../components";
import type {Album} from "./api";

export default class AlbumScreen extends React.Component<NavigationProps<{ album: Album }>> {

        render(): React.Node {
            const {navigation} = this.props;
            const {album} = navigation.state.params;
            const tracks = MusicAPI.tracks(album.id);
            return (
                <Container>
                    <NavigationBar back="Library" {...{navigation}} />
                    <DetailHeader {...{album}} />
                    <Content style={styles.gutter}>
                        <List rows={tracks} renderRow={(track, i) => <Track track={track.name} index={i+1} />} />
                    </Content>
                </Container>
            );
        }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small
    }
})
