// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {BaseCard, Text, Avatar, StyleGuide} from "../../components";

import type {Message, User} from "./Model";

type ChatMessageProps = {
    message: Message,
    messages: Message[],
    user: User
};

export default class ChatMessage extends React.PureComponent<ChatMessageProps> {

    render(): React.Node {
        const {message, messages, user} = this.props;
        const nextMessage = messages.filter((m, i) => i - 1 >= 0 && messages[i - 1].id === message.id)[0];
        const flexDirection = message.me ? "row-reverse" : "row";
        const showAvatar = !nextMessage || (message.me ? !nextMessage.me : nextMessage.me);
        if (!user) {
            return null;
        }
        return (
            <View style={{ flexDirection, marginBottom: StyleGuide.spacing.small }}>
                <View style={styles.user}>
                    {showAvatar && <Avatar size={48} uri={user.picture} />}
                </View>
                <BaseCard style={styles.baseCard}>
                    <Text>{message.message}</Text>
                </BaseCard>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseCard: {
        minHeight: 48,
        justifyContent: "center",
        flex: 1,
        marginTop: 0
    },
    user: {
        width: 80,
        justifyContent: "flex-end"
    }
});
