// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {StyleGuide, Container, NavigationBar, Content, List, type NavigationProps} from "../components";

import {type Playlist, type Track} from "../components/music/Model";
import {PlaylistEntry, PlaylistHeader, PlayerActionSheet} from "../components/music";

type PlaylistScreenParams = { playlist: Playlist, back: string };

export default class PlaylistScreen extends React.PureComponent<NavigationProps<PlaylistScreenParams>> {

    // $FlowFixMe
    playerActionSheet = React.createRef();

    toggle = (playlist: Playlist, track: Track) => {
        this.playerActionSheet.current.toggle(playlist, track);
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {playlist, back} = navigation.state.params;
        return (
            <Container>
                <NavigationBar {...{navigation, back}} />
                <PlaylistHeader {...{playlist}} />
                <Content style={styles.gutter}>
                    <List
                        rows={playlist.entries}
                        renderRow={entry => <PlaylistEntry onPress={this.toggle} {...{playlist, entry}} />}
                    />
                </Content>
                <PlayerActionSheet ref={this.playerActionSheet} />
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
