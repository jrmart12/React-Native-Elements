// @flow
import * as React from "react";
import {Text, StyleSheet} from "react-native";

import {StyleGuide, withTheme} from "./theme";

import type {Typographies, ThemeProps} from "./theme";
import type {StyleProps} from "./theme";

type TypographyProps = StyleProps & ThemeProps & {
    type: $Keys<Typographies>,
    color: string,
    children: string,
    primary?: boolean
};

class TextComp extends React.Component<TypographyProps> {

    static defaultProps = {
        type: "body",
        color: StyleGuide.palette.black
    };

    render(): React.Node {
        const {theme, type, style, children, primary} = this.props;
        const typography = StyleGuide.typography[type];
        const color = primary ? theme.palette.primary : (typography.color ? typography.color : this.props.color);
        const computedStyle = [typography, { color }];
        computedStyle.push(styles.default);
        computedStyle.push(style);
        return <Text style={computedStyle}>{children}</Text>;
    }
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: "transparent"
    }
});

export default withTheme(TextComp);
