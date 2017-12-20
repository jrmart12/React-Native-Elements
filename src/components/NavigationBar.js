// @flow
import * as React from "react";
import PropTypes from "prop-types";
import {StyleSheet, SafeAreaView} from "react-native";

import Text from "./Text";

type NavigationBarProps = {
    title: string,
    transparent?: boolean
};

export default class NavigationBar extends React.Component<NavigationBarProps> {

    static contextTypes = {
        color: PropTypes.string
    };

    render(): React.Node {
        const {title} = this.props;
        const {color} = this.context;
        return (
            <SafeAreaView style={{ backgroundColor: color }}>
                <Text>{title}</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});
