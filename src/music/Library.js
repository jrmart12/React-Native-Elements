// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, type NavigationProps} from "../components";

import MusicAPI from "./api";
import type {Album as AlbumModel} from "../components/music/Model";
import {PlayerProvider, Album, withPlayer, type PlayerProps} from "../components/music";

class Library extends React.Component<PlayerProps & NavigationProps<>> {

    renderItem = (album: AlbumModel): React.Node => {
        const {navigation} = this.props;
        return <Album {...{album, navigation}} />;
    }

    onPress = async (): Promise<void> => {
        const playerProvider = PlayerProvider.getInstance();
        const {navigation} = this.props;
        if (playerProvider.sound) {
            await playerProvider.sound.unloadAsync();
        }
        navigation.navigate("Welcome");
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = MusicAPI.albums;
        const title = "Library";
        const rightAction = {
            icon: "sign-out",
            onPress
        };
        return (
            <Feed {...{data, renderItem, title, navigation, rightAction}} style={styles.content} numColumns={2} />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small + 64
    }
});

export default withPlayer(Library);
