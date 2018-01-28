// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Dimensions, View, TouchableWithoutFeedback} from "react-native";

import {Image, StyleGuide, type NavigationProps} from "../../components";
import {type Photo} from "../api";

type PhotoProps = NavigationProps<> & {
    photo: Photo,
    from: string
};

export default class PhotoThumbnail extends React.PureComponent<PhotoProps> {

    @autobind
    onPress() {
        const {navigation, photo, from} = this.props;
        navigation.navigate("Photo", { photo, from });
    }

    render(): React.Node {
        const {onPress} = this;
        const {photo} = this.props;
        return (
            <TouchableWithoutFeedback {...{onPress}}>
                <View>
                    <Image style={styles.photo} uri={photo.urls.small} preview={photo.urls.preview} />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const {width} = Dimensions.get("window");
const size = (width - (4 * StyleGuide.spacing.small)) / 3;
const styles = StyleSheet.create({
    photo: {
        width: size,
        height: size,
        borderWidth: 3,
        borderColor: "white",
        borderRadius: 2,
        marginLeft: StyleGuide.spacing.small,
        ...StyleGuide.styles.shadow
    }
});
