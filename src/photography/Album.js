// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, type NavigationProps} from "../components";

import PhotograhyAPI from "./api";
import {PhotoThumbnail} from "../components/photography";
import type {Photo} from "../components/photography/Model";

export default class Album extends React.Component<NavigationProps<{ album: string }>> {

    renderItem = (photo: Photo): React.Node => {
        const {navigation} = this.props;
        return <PhotoThumbnail from="Photos" {...{photo, navigation}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const {album} = navigation.state.params;
        const data = PhotograhyAPI.album(album);
        const title = album;
        const back = "Albums";
        return (
            <Feed
                style={styles.content}
                numColumns={3}
                {...{back, data, renderItem, title, navigation}}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
