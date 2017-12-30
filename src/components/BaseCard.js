// @flow
import * as React from "react";
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";

import {StyleGuide} from "./theme";
import type {StyleProps} from "./theme";

type BaseCardProps = StyleProps & {
    onPress?: () => mixed,
    children: React.Node
};

export default class BaseCard extends React.Component<BaseCardProps> {

    render(): React.Node {
        const {style, onPress, children} = this.props;
        return (
            <TouchableWithoutFeedback {...{onPress}}>
                <View style={[styles.card, style]}>
                {children}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: StyleGuide.spacing.small,
        ...StyleGuide.styles.borderRadius,
        ...StyleGuide.styles.shadow
    }
});
