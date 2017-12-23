// @flow
import * as React from "react";
import {Text as RNText} from "react-native";

import {withTheme} from "./Theme";
import type {ThemeProps, StyleProps} from "./Types";

type TypographyProps = ThemeProps & StyleProps & {
    type: "body" | "callout" | "caption" | "footnote" | "headline" | "subhead" | "title1" | "title2" | "title3",
    children: string
};

class Text extends React.Component<TypographyProps> {

    static defaultProps = {
        type: "body"
    };

    render(): React.Node {
        const {type, style, children, theme} = this.props;
        const defaultStyle = [theme.typography[type]];
        defaultStyle.push(style);
        return <RNText style={defaultStyle}>{children}</RNText>;
    }
}

export default withTheme(Text);
