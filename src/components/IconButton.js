// @flow
import * as React from "react";
import {TouchableOpacity, View} from "react-native";

import Icon from "./Icon";
import {withTheme} from "./theme";

import type {IconName} from "./Model";
import type {ThemeProps, StyleProps} from "./theme";

type IconButtonProps = StyleProps & ThemeProps & {
    onPress: () => mixed,
    name: IconName,
    color: string,
    primary: boolean,
    backgroundPrimary: boolean,
    rounded: boolean
};

class IconButton extends React.PureComponent<IconButtonProps> {

    static defaultProps = {
        color: "white",
        backgroundPrimary: false,
        primary: false,
        rounded: false
    }

    render(): React.Node {
        const {onPress, name, theme, backgroundPrimary, primary, rounded} = this.props;
        const style = [];
        if (rounded) {
            style.push({
                borderRadius: 14,
                width: 28,
                height: 28,
                justifyContent: "center",
                alignItems: "center"
            });
        }
        if (backgroundPrimary) {
            style.push({
                backgroundColor: theme.palette.primary
            });
        }
        const color = primary ? theme.palette.primary : this.props.color;
        style.push(this.props.style);
        return (
            <TouchableOpacity {...{onPress}}>
                <View {...{style}}>
                    <Icon {...{name, color}} />
                </View>
            </TouchableOpacity>
        );
    }
}

export default withTheme(IconButton);
