// @flow
import * as React from "react";
import {Text as RNText} from "react-native";
import {inject} from "mobx-react/native";

import type {ThemeProps, StyleProps} from "./Types";

type TypographyProps = ThemeProps & StyleProps & {
    type: "body" | "callout" | "caption" | "footnote" | "headline" | "subhead" | "title1" | "title2" | "title3",
    gutterBottom?: boolean,
    children: string
};

@inject("theme")
export default class Text extends React.Component<TypographyProps> {

    static defaultProps = {
        type: "body"
    };

    render(): React.Node {
        const {type, style, gutterBottom, children, theme} = this.props;
        const defaultStyle = [theme.typography[type]];
        defaultStyle.push({
            marginBottom: gutterBottom ? theme.spacing.small : 0
        });
        defaultStyle.push(style);
        return <RNText style={defaultStyle}>{children}</RNText>;
    }
}
