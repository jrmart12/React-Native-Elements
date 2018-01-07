// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {StyleGuide, Text, BaseCard} from "../../components";
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
            <BaseCard>
                <Header {...{user, timestamp}} />
                <Text style={styles.text}>{message}</Text>
            </BaseCard>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        padding: StyleGuide.spacing.tiny
    }
});
