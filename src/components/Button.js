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
    disabled?: boolean
};

class Button extends React.Component<ButtonProps> {

    // TODO: Fix me
    static defaultProps = {};

    render(): React.Node {
        const {onPress, style, label, icon, primary, secondary, theme, disabled} = this.props;
        const backgroundColor = primary ? theme.palette.primary : (secondary ? theme.palette.secondary : "transparent");
        const opacity = disabled ? 0.5 : 1;
        const color = primary ? "white" : (secondary ? theme.palette.primary : "black");
        const shadow = primary ? StyleGuide.styles.shadow : {};
        const Btn = disabled ? View : (Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback);
        return (
            <Btn style={[styles.button, { backgroundColor, opacity, ...shadow }, style]} {...{onPress}}>
                {icon && <Icon name={icon} {...{color}} style={styles.icon} />}
                {label && <Text type="headline" {...{color}}>{label}</Text>}
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
