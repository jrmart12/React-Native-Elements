// @flow
import * as React from "react";
import {StyleSheet, TextInput, View} from "react-native";

import {StyleGuide, SegmentedControl, KeyboardSpacer} from "../../components";

type NewMessageProps = {
    enableOnAndroid: boolean
};

type NewMessageState = {
    selectedIndex: number
};

export default class NewMessage extends React.Component<NewMessageProps, NewMessageState> {

    static defaultProps = {
        enableOnAndroid: false
    };

    state = {
        selectedIndex: 0
    };

    onChange = (selectedIndex: number) => this.setState({ selectedIndex });

    render(): React.Node {
        const {onChange} = this;
        const {enableOnAndroid} = this.props;
        const {selectedIndex} = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Share a message"
                    underlineColorAndroid="transparent"
                    textAlignVertical="top"
                    multiline
                    autoFocus
                />
                <SegmentedControl values={["Text", "Photo"]} {...{selectedIndex, onChange}} />
                <KeyboardSpacer {...{enableOnAndroid}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: StyleGuide.spacing.base
    },
    textInput: {
        height: 143,
        ...StyleGuide.typography.body
    }
});
