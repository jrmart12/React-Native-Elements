// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, View} from "react-native";
import {Ionicons as Icon} from "@expo/vector-icons";

import Text from "./Text";
import {StyleGuide} from "./theme";

export default class PayButton extends React.Component<{}> {

    render(): React.Node {
        const Button = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
        const name = Platform.OS === "ios" ? "logo-apple" : "logo-android";
        const color = "white";
        return (
            <Button onPress={this.notImplementedYet}>
                <View style={styles.button} >
                    <Icon {...{name, color}} size={28} style={styles.icon} />
                    <Text {...{color}}>Pay</Text>
                </View>
            </Button>
        );
    }

    @autobind
    notImplementedYet() {
        alert("Not Implemented yet ¯\\_(ツ)_/¯");
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        ...StyleGuide.styles.button,
        ...StyleGuide.styles.shadow
    },
    icon: {
        ...StyleGuide.styles.buttonIcon
    }
});
