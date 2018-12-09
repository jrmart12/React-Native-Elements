// @flow
import * as React from "react";
import {StyleSheet, Dimensions, View, TouchableWithoutFeedback} from "react-native";

import {Image, StyleGuide, type NavigationProps} from "../../components";
import {type Photo} from "./Model";

type PhotoProps = NavigationProps<*> & {
    photo: Photo,
    from: string,
    size: number
};

const {width} = Dimensions.get("window");
const defaultSize = (width - (4 * StyleGuide.spacing.small)) / 3;

export default class PhotoThumbnail extends React.PureComponent<PhotoProps> {

    static defaultProps = {
        size: defaultSize
    };

    onPress = () => {
        const {navigation, photo, from} = this.props;
        navigation.navigate("Photo", { photo, from });
    }

    render(): React.Node {
        const {onPress} = this;
        const {photo, size} = this.props;
        return (
            <TouchableWithoutFeedback {...{onPress}}>
                <View>
                    <Image
                        style={[styles.photo, { width: size, height: size }]}
                        uri={photo}
                        preview={photo}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    photo: {
        borderWidth: 8,
        borderColor: StyleGuide.palette.green,
        borderRadius: 0,
        marginLeft: StyleGuide.spacing.small
    }
});
