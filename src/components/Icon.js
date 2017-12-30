// @flow
import * as React from "react";
import {Feather as Icon} from "@expo/vector-icons";

import {StyleGuide, withTheme} from "./theme";

import type {ThemeProps} from "./theme";
import type {IconName} from "./Model";

type IconProps = ThemeProps & {
    name: IconName,
    primary?: boolean,
    secondary?: boolean,
    color: string
};

class IconComp extends React.Component<IconProps> {

    static defaultProps = {
        color: StyleGuide.palette.darkGray
    };

    render(): React.Node {
        const {theme, name, primary, secondary, color} = this.props;
        const iconColor = primary ? theme.palette.primary : (secondary ? theme.palette.secondary : color);
        return (
            <Icon size={28} color={iconColor} {...{name}} />
        );
    }
}

export default withTheme(IconComp);
