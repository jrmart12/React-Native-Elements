// @flow
import moment from "moment";

import * as React from "react";
import {StyleSheet, SafeAreaView, TextInput, View} from "react-native";

import {Feed, Container, IconButton, KeyboardSpacer, StyleGuide} from "../components";
import SocialAPI from "./api";
import {ChatMessage} from "../components/social";

import type {NavigationProps} from "../components/Navigation";
import type {Message as MessageModel} from "../components/social/Model";

type MessageState = {
    message: string,
    messages: MessageModel[]
};

export default class Message extends React.Component<NavigationProps<{ id: string }>, MessageState> {

    state = {
        messages: [],
        message: ""
    };

    postMessage = () => {
        const {messages, message} = this.state;
        messages.push({
            id: moment().format("X"),
            me: true,
            message,
            timestamp: parseInt(moment().format("X"), 10)
        });
        this.setState({ messages: messages.slice(), message: "" });
    }

    setMessage = (message: string) => this.setState({ message });

    componentDidMount() {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const {messages} = SocialAPI.messageThread(id);
        this.setState({ messages });
    }

    renderItem = (message: MessageModel): React.Node => {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const thread = SocialAPI.messageThread(id);
        const {messages} = thread;
        const user = message.me ? SocialAPI.me() : SocialAPI.user(thread.user);
        return <ChatMessage {...{messages, message, user}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const {messages, message} = this.state;
        const {id} = navigation.state.params;
        const thread = SocialAPI.messageThread(id);
        const user = SocialAPI.user(thread.user);
        const back = "Messages";
        const title = user.name;
        return (
            <Container>
                <Feed data={messages.slice().reverse()} inverted {...{renderItem, back, title, navigation}} />
                <SafeAreaView style={styles.inputBox}>
                    <View style={styles.innerInputBox}>
                        <TextInput
                            placeholder="Message"
                            underlineColorAndroid="transparent"
                            style={styles.input}
                            onSubmitEditing={this.postMessage}
                            onChangeText={this.setMessage}
                            value={message}
                            blurOnSubmit={false}
                        />
                        <IconButton name="send" onPress={this.postMessage} backgroundPrimary rounded />
                    </View>
                </SafeAreaView>
                <KeyboardSpacer />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: StyleGuide.palette.white
    },
    innerInputBox: {
        padding: StyleGuide.spacing.tiny,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        backgroundColor: StyleGuide.palette.lightGray,
        flex: 1,
        padding: StyleGuide.spacing.tiny,
        marginRight: StyleGuide.spacing.tiny,
        ...StyleGuide.styles.borderRadius
    }
});
