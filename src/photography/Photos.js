// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, type NavigationProps} from "../components";

import PhotograhyAPI from "./api";
import {PhotoThumbnail} from "../components/photography";
import type {Photo} from "../components/photography/Model";

export default class Photos extends React.Component<NavigationProps<>> {

    renderItem = (photo: Photo): React.Node => {
        const {navigation} = this.props;
        return <PhotoThumbnail from="Photos" {...{photo, navigation}} />;
    }

    onPress = async (): Promise<void> => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = PhotograhyAPI.photos;
        const title = "Library";
        const rightAction = {
            icon: "sign-out",
            onPress
        };
        return (
            <Feed
                style={styles.content}
                numColumns={3}
                {...{data, renderItem, title, navigation, rightAction}}
            />
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
