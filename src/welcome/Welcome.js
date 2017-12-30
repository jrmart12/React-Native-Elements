// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, TouchableWithoutFeedback} from "react-native";

import {Text} from "../components";
import type {ScreenProps} from "../components/Navigation";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    food() {
        this.props.navigation.navigate("Food");
    }

    render(): React.Node {
        return (
            <View>
                <TouchableWithoutFeedback onPress={this.food}>
                    <Text>Food</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
