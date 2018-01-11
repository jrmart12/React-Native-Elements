// @flow
import * as React from "react";
import {Platform} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class KeyboardSpacerComp extends React.Component<{}> {

    render(): React.Node {
        if (Platform.OS === "ios") {
            return <KeyboardSpacer />;
        } else {
            return null;
        }
    }
}
