// @flow
"use strict";
import * as React from "react";
import {StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, View} from "react-native";

import Icon from "./Icon";
import Text from "./Text";
import {withTheme, StyleGuide} from "./theme";

import type {IconName} from "./Model";
import type {ThemeProps, StyleProps} from "./theme";

type ButtonProps = ThemeProps & StyleProps & {
    onPress: () => void,
    primary?: boolean,
    secondary?: boolean,
    label?: string,
    icon?: IconName,
    disabled?: boolean,
    primaryTextColor?: boolean
};

class Button extends React.Component<ButtonProps> {

    // TODO: fixme
    static defaultProps = {};

    render(): React.Node {
        const {
            onPress, style, label, icon, primary, secondary, theme, primaryTextColor, disabled
        } = this.props;
        const backgroundColor = primary ? theme.palette.primary : (secondary ? theme.palette.secondary : "transparent");
        const opacity = disabled ? 0.5 : 1;
        const color = primary ? "white" : (
            secondary ? theme.palette.primary : (primaryTextColor ? theme.palette.primary : StyleGuide.palette.darkGray)
        );
        const shadow = primary ? StyleGuide.styles.shadow : {};
        const Btn = disabled ? View : (Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback);
        return (
            <Btn {...{onPress}}>
                <View style={[styles.button, { backgroundColor, opacity, ...shadow }, style]} >
                {icon && <Icon name={icon} style={styles.icon} {...{color}} />}
                {label && <Text type="headline" {...{color}}>{label}</Text>}
                </View>
            </Btn>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        ...StyleGuide.styles.button
    },
    icon: {
        ...StyleGuide.styles.buttonIcon,
    }
});

export default withTheme(Button);
