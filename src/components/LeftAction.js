// @flow
import * as React from "react";
import {StyleSheet, View, TouchableHighlight} from "react-native";

import Text from "./Text";
import Icon from "./Icon";

import type {IconName} from "./Model";

type LeftActionProps = {
    name: IconName,
    label: string,
    onPress: () => void
};

export default class LeftAction extends React.Component<LeftActionProps> {

    render(): React.Node {
        const {name, label, onPress} = this.props;
        return (
            <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" {...{onPress}}>
                <View style={styles.backBtn}>
                    <Icon color="white" {...{name}} />
                    <Text color="white">{label}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    backBtn: {
        flexDirection: "row",
        alignItems: "center"
    }
});