// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {observer} from "mobx-react/native";
import {observable, action} from "mobx";

import {Text, StyleGuide, Icon} from "../../components";

import type {Ingredient} from "../api";

type IngredientProps = {
    ingredient: Ingredient
};

@observer
export default class IngredientComp extends React.Component<IngredientProps> {

    @observable checked: boolean = false;

    @autobind @action toggle() { this.checked = !this.checked; }

    componentWillMount() {
        const {ingredient} = this.props;
        ingredient.checked && this.toggle();
    }

    render(): React.Node {
        const {checked} = this;
        const {ingredient} = this.props;
        return (
            <View>
            <TouchableOpacity onPress={this.toggle}>
                <View style={[styles.content, { opacity: checked ? 0.5 : 1 }]}>
                    <View style={styles.radio}>
                        <Icon name={checked ? "check-circle" : "circle"} primary={true} />
                    </View>
                    <View style={styles.text}>
                        <Text>{ingredient.name}</Text>
                        <Text style={styles.subhead} type="subhead">{ingredient.quantity}</Text>
                    </View>
                </View>
            </TouchableOpacity>
                <View style={styles.separator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        ...StyleGuide.styles.separator
    },
    content: {
        flexDirection: "row"
    },
    subhead: {
        color: StyleGuide.palette.darkGray
    },
    radio: {
        paddingHorizontal: StyleGuide.spacing.small,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        padding: StyleGuide.spacing.tiny
    }
});
