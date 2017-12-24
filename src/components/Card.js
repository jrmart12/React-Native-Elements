// @flow
import * as React from "react";
import {View, StyleSheet} from "react-native";
import {LinearGradient} from "expo";

import SmartImage from "./SmartImage";
import Text from "./Text";
import {StyleGuide} from "./Theme";

import type {Picture} from "./API";

type CardProps = {
    title: string,
    subtitle?: string,
    description?: string,
    picture: Picture,
    height?: number
};

export default class Card extends React.Component<CardProps> {

    static defaultProps = {
        height: 300
    };

    render(): React.Node {
        const {picture, height, title, subtitle, description} = this.props;
        return (
            <View style={styles.card}>
                <SmartImage style={[styles.image, { height }]} {...picture} />
                <View style={styles.content}>
                    <LinearGradient colors={topGradient} style={styles.gradient}>
                        {
                            subtitle && (
                                <Text type="headline" style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
                            )
                        }
                        <Text type="title2" style={styles.title}>{title}</Text>
                    </LinearGradient>
                    {
                        description && (
                            <LinearGradient colors={bottomGradient} style={styles.gradient}>
                                <Text>{description}</Text>
                            </LinearGradient>
                        )
                    }
                </View>
            </View>
        );
    }
}

const topGradient = ["rgba(0,0,0,0.8)", "transparent"];
const bottomGradient = ["transparent", "rgba(0,0,0,0.8)"];
const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        marginBottom: StyleGuide.spacing.small,
        marginHorizontal: StyleGuide.spacing.small,
        backgroundColor: StyleGuide.palette.gray
    },
    image: {
        borderRadius: 8
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-between"
    },
    gradient: {
        padding: StyleGuide.spacing.small,
        borderRadius: 8
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: 15
    },
    title: {
        color: "white"
    }
});
