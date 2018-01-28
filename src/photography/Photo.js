// @flow
import moment from "moment";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {NavigationBar, Image, type NavigationProps} from "../components";

import type {Photo} from "./api";

export default class PhotoScreen extends React.PureComponent<NavigationProps<{ photo: Photo, from: string }>> {

    render(): React.Node {
        const {navigation} = this.props;
        const {photo, from} = navigation.state.params;
        const date = moment(photo.created_at).format("DD MMMM YYYY · HH:mm");
        const title = photo.location ? photo.location.name : "";
        const subtitle = date;
        return (
            <View style={styles.container}>
                <Image preview={photo.urls.preview} uri={photo.urls.full} style={styles.image} />
                <NavigationBar type="transparent" back={from} withGradient {...{navigation, title, subtitle}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        ...StyleSheet.absoluteFillObject
    }
});
