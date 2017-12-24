// @flow
import * as React from "react";
import {Text as RNText, StyleSheet} from "react-native";

import {withTheme} from "./Theme";
import type {ThemeProps, Typographies} from "./Theme";
import type {StyleProps} from "./Types";

type TypographyProps = ThemeProps & StyleProps & {
    type: $Keys<Typographies>,
    children: string
};

class Text extends React.Component<TypographyProps> {

    static defaultProps = {
        type: "body"
    };

    render(): React.Node {
        const {type, style, children, theme} = this.props;
        const computedStyle = [theme.typography[type]];
        computedStyle.push(styles.default);
        computedStyle.push(style);
        return <RNText style={computedStyle}>{children}</RNText>;
    }
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: "transparent"
    }
});

export default withTheme(Text);
