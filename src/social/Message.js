// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, SafeAreaView, TextInput, View} from "react-native";

import {Feed, Container, IconButton, KeyboardSpacer, StyleGuide, notImplementedYet} from "../components";
import SocialAPI from "./api";
import {ChatMessage} from "./components";

import type {NavigationProps} from "../components/Navigation";
import type {Message as MessageModel} from "./api";

export default class Message extends React.PureComponent<NavigationProps<{ id: string }>> {

    @autobind
    renderItem(message: MessageModel): React.Node {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        return <ChatMessage {...{id, message}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const thread = SocialAPI.messageThread(id);
        const user = SocialAPI.user(thread.user);
        const back = "Messages";
        const title = user.name;
        return (
            <Container>
                <Feed data={thread.messages} {...{renderItem, back, title, navigation}} />
                <SafeAreaView style={styles.inputBox}>
                    <View style={styles.innerInputBox}>
                        <TextInput
                            placeholder="Message"
                            underlineColorAndroid="transparent"
                            style={styles.input}
                        />
                        <IconButton name="arrow-up" onPress={notImplementedYet} backgroundPrimary rounded />
                    </View>
                </SafeAreaView>
                <KeyboardSpacer />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: "white"
    },
    innerInputBox: {
        padding: StyleGuide.spacing.tiny,
        flexDirection: "row"
    },
    input: {
        backgroundColor: StyleGuide.palette.lightGray,
        flex: 1,
        padding: StyleGuide.spacing.tiny,
        marginRight: StyleGuide.spacing.tiny,
        ...StyleGuide.styles.borderRadius
    }
});
