// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, StyleGuide} from "../../components";

import Avatar from "./Avatar";

import type {User} from "../api";

type HandleProps = {
    user: User,
    handleColor: string
};

export default class Handle extends React.Component<HandleProps> {

    static defaultProps = {
        handleColor: "black"
    }

    render(): React.Node {
        const {user, handleColor} = this.props;
        return (
            <View style={styles.user}>
                <Avatar uri={user.picture} />
                <View style={styles.username}>
                    <Text type="headline" style={styles.headline} color={handleColor}>{user.name}</Text>
                    <Text type="footnote" style={styles.footnote}>{`@${user.id}`}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user: {
        flexDirection: "row",
        alignItems: "stretch"
    },
    username: {
        justifyContent: "space-between",
        marginLeft: StyleGuide.spacing.tiny
    },
    headline: {
        lineHeight: 17
    },
    footnote: {
        lineHeight: 13
    }
});
