// @flow

import * as React from "react";
import {StyleSheet, View} from "react-native";

import Button from "./Button";
import Text from "./Text";
import {withTheme, StyleGuide} from "./theme";

import type {ThemeProps} from "./theme";

type QuantityInputProps = ThemeProps & {
    singular: string,
    plural: string,
    from: number,
    to: number
};

type QuantityInputState = {
    quantity: number
};

class QuantityInput extends React.Component<QuantityInputProps, QuantityInputState> {

    state = {
        quantity: 1
    };

    increment = () => this.setState({ quantity: this.state.quantity + 1 });
    decrement = () => this.setState({ quantity: this.state.quantity - 1 });

    render(): React.Node {
        const {singular, plural, from, to, theme} = this.props;
        const {quantity} = this.state;
        return (
            <View style={[styles.container, { backgroundColor: theme.palette.secondary }]}>
                <Button
                    icon="minus"
                    secondary
                    style={styles.leftButton}
                    disabled={quantity === from}
                    onPress={this.decrement}
                />
                <Text primary>{`${quantity} ${quantity > 1 ? plural : singular}`}</Text>
                <Button
                    icon="plus"
                    secondary
                    style={styles.rightButton}
                    disabled={quantity === to}
                    onPress={this.increment}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: StyleGuide.spacing.small,
        ...StyleGuide.styles.borderRadius
    },
    leftButton: {
        marginBottom: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    rightButton: {
        marginBottom: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }
});

export default withTheme(QuantityInput);
