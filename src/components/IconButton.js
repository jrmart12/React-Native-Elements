// @flow
import * as React from "react";
import {TouchableOpacity, View} from "react-native";

import Icon from "./Icon";
import {withTheme} from "./theme";

import type {IconName} from "./Model";
import type {ThemeProps, StyleProps} from "./theme";

type IconButtonProps = StyleProps & ThemeProps & {
    onPress: () => void,
    name: IconName,
    color: string,
    primary: boolean
};

class IconButton extends React.Component<IconButtonProps> {

    static defaultProps = {
        color: "white",
        primary: false
    }

    render(): React.Node {
        const {onPress, name, color, theme, primary} = this.props;
        const style = [];
        if (primary) {
            style.push({
                backgroundColor: theme.palette.primary,
                borderRadius: 14,
                width: 28,
                height: 28,
                justifyContent: "center",
                alignItems: "center"
            });
        }
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
