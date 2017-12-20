// @flow
import * as React from "react";
import {StyleSheet, View, Text} from "react-native";

import type {ScreenProps} from "../components/Types";

export default class Recipes extends React.Component<ScreenProps<>> {

    render(): React.Node {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});
