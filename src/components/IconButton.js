// @flow
import * as React from "react";
import {TouchableOpacity, StyleSheet, View} from "react-native";

import Icon from "./Icon";

import type {IconName} from "./Model";
import type {StyleProps} from "./theme";

type IconButtonProps = StyleProps & {
    onPress: () => void,
    name: IconName,
    color: string
};

export default class IconButton extends React.Component<IconButtonProps> {

    static defaultProps = {
        color: "white"
    }

    render(): React.Node {
        const {onPress, name, color, style} = this.props;
        return (
            <TouchableOpacity style={styles.button} {...{onPress}}>
                <View {...{style}}>
                    <Icon {...{name, color }} />
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "transparent",
        alignSelf: "center"
    }
})
