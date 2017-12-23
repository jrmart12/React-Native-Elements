// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

type CardProps = {
    title: string,
    subtitle: string,
    description: string,
    image: string,
    height?: number
};

export default class Card extends React.Component<CardProps> {

    static defaultProps = {
        height: 300
    };

    render(): React.Node {
        return (
            <View style={styles.card}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        height: 300,
        borderRadius: 8
    }
});
