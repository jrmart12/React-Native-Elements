// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";

import {Feed, StyleGuide, notImplementedYet, type NavigationProps} from "../components";

import PhotograhyAPI, {type Photo} from "./api";
import {PhotoThumbnail} from "./components";

export default class Photos extends React.Component<NavigationProps<>> {

    @autobind
    renderItem(photo: Photo): React.Node {
        const {navigation} = this.props;
        return <PhotoThumbnail from="Photos" {...{photo, navigation}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = PhotograhyAPI.photos;
        const title = "Library";
        const rightAction = {
            icon: "camera",
            onPress: notImplementedYet
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
