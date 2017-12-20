// @flow
import * as React from "react";
import {Text as RNText} from "react-native";

import {Theme} from "./Theme";
import type {BaseProps} from "./Types";

type TypographyProps = BaseProps & {
    type: "body" | "callout" | "caption" | "footnote" | "headline" | "subhead" | "title1" | "title2" | "title3",
    gutterBottom?: boolean,
    children: string
};

export default class Text extends React.Component<TypographyProps> {

    static defaultProps = {
        type: "body"
    };

    render(): React.Node {
        const {type, style, gutterBottom, children} = this.props;
        const defaultStyle = [Theme.typography[type]];
        defaultStyle.push({
            marginBottom: gutterBottom ? Theme.spacing.small : 0
        });
        defaultStyle.push(style);
        return <RNText style={defaultStyle}>{children}</RNText>;
    }
}
