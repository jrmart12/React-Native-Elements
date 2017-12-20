// @flow
import * as React from "react";
import {StyleSheet, SafeAreaView} from "react-native";

import Text from "./Text";

type NavigationBarProps = {
    title: string,
    transparent?: boolean
};

export default class NavigationBar extends React.Component<NavigationBarProps> {

    render(): React.Node {
        const {title} = this.props;
        return (
            <SafeAreaView>
                <Text>{title}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});
