// @flow
import * as React from "react";
import {StyleSheet, View, TextInput} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

import {StyleGuide} from "../../components";

export default class NewMessage extends React.Component<{}> {

    render(): React.Node {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Share a message"
                    underlineColorAndroid="transparent"
                    multiline={true}
                />
                <KeyboardSpacer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: StyleGuide.spacing.base
    },
    textInput: {
        height: 223,
        ...StyleGuide.typography.body
    }
});
