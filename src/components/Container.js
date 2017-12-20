// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import type {ChildrenProps} from "./Types";

export default class Container extends React.Component<ChildrenProps> {

    render(): React.Node {
        return (
            <View style={styles.container}>{this.props.children}</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
