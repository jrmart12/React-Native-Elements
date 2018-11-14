// @flow
import * as React from "react";
import {StyleSheet} from "react-native";

import {StyleGuide, Text, BaseCard} from "../../components";

import Header from "./Header";

import type {OptionalNavigationProps} from "../../components/Navigation";
import type {User} from "./Model";

type MessageProps = OptionalNavigationProps & {
    user: User,
    message: string,
    timestamp: number,
    id?: string
};

export default class Message extends React.PureComponent<MessageProps> {

    render(): React.Node {
        const {message, timestamp, navigation, id, user} = this.props;
        return (
            <BaseCard onPress={() => navigation && navigation.navigate("Message", { id })}>
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
