// @flow
import * as React from "react";
import {SafeAreaView, View} from "react-native";

import Text from "./Text";
import {withStyles} from "./Theme";

import type {Theme, Styles, StyleProps} from "./Theme";
import type {NavigationProps} from "./Types";

type StyleNames = "root" | "text" | "content";

const styles = (theme: Theme): Styles<StyleNames> => ({
    root: {
        backgroundColor: theme.palette.primary
    },
    content: {
        height: theme.constants.barHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        color: "white"
    }
});

type NavigationBarType = "opaque" | "transparent" | "tinted";

type NavigationBarProps = StyleProps<StyleNames> & NavigationProps<> & {
    title: string,
    type: NavigationBarType
};

class NavigationBar extends React.Component<NavigationBarProps> {

    static defaultProps = {
        type: "opaque"
    };

    render(): React.Node {
        const {title, styles} = this.props;
        return (
            <SafeAreaView style={styles.root}>
                <View style={styles.content}>
                    <View />
                    <Text type="headline" style={styles.text}>{title}</Text>
                    <View />
                </View>
            </SafeAreaView>
        );
    }
}

export default withStyles(styles, NavigationBar);
