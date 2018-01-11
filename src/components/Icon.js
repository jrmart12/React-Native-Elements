// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";

import {StyleGuide, withTheme} from "./theme";

import type {ThemeProps} from "./theme";
import type {IconName} from "./Model";

type IconProps = ThemeProps & {
    name: IconName,
    primary?: boolean,
    secondary?: boolean,
    color: string,
    size: number
};

class IconComp extends React.Component<IconProps> {

    static defaultProps = {
        color: StyleGuide.palette.darkGray,
        size: 28
    };

    render(): React.Node {
        const {theme, name, primary, secondary, color, size} = this.props;
        const iconColor = primary ? theme.palette.primary : (secondary ? theme.palette.secondary : color);
        return (
            <Icon color={iconColor} style={styles.icon} {...{name, size}} />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "transparent"
    }
});

export default withTheme(IconComp);
