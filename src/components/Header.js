// @flow
import * as React from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {LinearGradient, Constants} from "expo";

import Image from "./Image";
import Text from "./Text";
import {StyleGuide} from "./theme";

import type {Picture} from "./Model";

type HeaderProps = {
    picture: Picture,
    title: string,
    children?: React.Node
};

export default class Header extends React.Component<HeaderProps> {

    render(): React.Node {
        const {picture, title, children} = this.props;
        return (
            <View>
                <Image style={styles.image} {...picture} />
                <LinearGradient
                    style={styles.gradient}
                    colors={["rgba(0,0,0,0.8)", "transparent", "rgba(0,0,0,0.8)"]}
                >
                    {children}
                    <Text type="title1" color="white" style={styles.text}>{title}</Text>
                </LinearGradient>
            </View>
        );
    }
}

const {width} = Dimensions.get("window");
const height = width * 0.62 + Constants.statusBarHeight;
const styles = StyleSheet.create({
    image: {
        height
    },
    gradient: {
        height,
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-between"
    },
    text: {
        padding: StyleGuide.spacing.small
    }
});
