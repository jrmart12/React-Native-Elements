// @flow
import * as React from "react";
import {SafeAreaView} from "react-native";
import {inject} from "mobx-react/native";

import Text from "./Text";

import type {ThemeProps, NavigationProps} from "./Types";

type NavigationBarType = "opaque" | "transparent" | "tinted";

type NavigationBarProps = ThemeProps & NavigationProps<> & {
    title: string,
    type?: NavigationBarType
};

@inject("theme")
export default class NavigationBar extends React.Component<NavigationBarProps> {

    static defaultProps = {
        type: "opaque"
    };

    render(): React.Node {
        const {title, theme} = this.props;
        return (
            <SafeAreaView style={{ backgroundColor: theme.palette.primary }}>
                <Text>{title}</Text>
            </SafeAreaView>
        );
    }
}
