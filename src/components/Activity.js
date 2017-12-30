// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {StyleGuide} from "./theme";
import BaseCard from "./BaseCard";
import Ratings from "./Ratings";
import Text from "./Text";
import Image from "./Image";

import type {Picture} from "./Model";

type ActivityProps = {
    title: string,
    subtitle: string,
    ratings: number,
    reviews: number,
    picture: Picture,
    onPress: () => mixed
};

export default class Activity extends React.Component<ActivityProps> {

    render(): React.Node {
        const {title, subtitle, ratings, reviews, picture, onPress} = this.props;
        return (
            <BaseCard style={styles.container} {...{onPress}}>
                <View style={styles.left}>
                    <View>
                        <Text type="headline">{title}</Text>
                        <Text type="footnote">{subtitle}</Text>
                    </View>
                    <View style={styles.rating}>
                        <Ratings {...{ratings}} />
                        <Text type="footnote" style={styles.reviews}>{`${reviews} reviews`}</Text>
                    </View>
                </View>
                <Image {...picture} style={styles.picture} />
            </BaseCard>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: StyleGuide.spacing.small
    },
    left: {
        justifyContent: "space-between"
    },
    rating: {
        flexDirection: "row",
        alignItems: "center"
    },
    reviews: {
        marginLeft: StyleGuide.spacing.tiny
    },
    picture: {
        width: 100,
        height: 68,
        marginLeft: StyleGuide.spacing.small,
        ...StyleGuide.styles.borderRadius
    }
});
