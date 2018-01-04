// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {StyleGuide, Text} from "../../components";
import SocialAPI from "../api";

import Header from "./Header";

type MessageProps = {
    user: string,
    message: string,
    timestamp: number
};

export default class Message extends React.Component<MessageProps> {

    render(): React.Node {
        const {message, timestamp} = this.props;
        const user = SocialAPI.user(this.props.user);
        return (
            <View style={styles.comment}>
                <Header {...{user, timestamp}} />
                <Text style={styles.text}>{message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    comment: {
        ...StyleGuide.styles.borderRadius,
        ...StyleGuide.styles.shadow,
        marginHorizontal: StyleGuide.spacing.small,
        marginTop: StyleGuide.spacing.small,
        backgroundColor: "white"
    },
    text: {
        padding: StyleGuide.spacing.tiny
    }
});
