// @flow
import * as React from "react";
import {Text, StyleSheet} from "react-native";

import {StyleGuide, withTheme} from "./theme";

import type {Typographies, ThemeProps, StyleProps} from "./theme";

type TypographyProps = StyleProps & ThemeProps & {
    type: $Keys<Typographies>,
    color: string,
    children: string,
    primary?: boolean,
    numberOfLines?: number
};

class TextComp extends React.PureComponent<TypographyProps> {

    static defaultProps = {
        type: "body",
        color: StyleGuide.palette.black
    };

    render(): React.Node {
        const {theme, type, style, children, primary, numberOfLines} = this.props;
        const typography = StyleGuide.typography[type];
        const color = (() => {
            if (primary) {
                return theme.palette.primary;
            } else if (typeof typography.color === "string") {
                return typography.color;
            }
            return this.props.color;
        })();
        const computedStyle = [typography, { color }];
        computedStyle.push(styles.default);
        computedStyle.push(style);
        return <Text style={computedStyle} {...{numberOfLines}}>{children}</Text>;
    }
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: "transparent"
    }
});

export default withTheme(TextComp);
