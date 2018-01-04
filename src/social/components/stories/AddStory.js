// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {TouchableOpacity, View} from "react-native";

import {Icon, withStyles} from "../../../components";

import type {Theme, StylesProps, StyleSheet} from "../../../components/theme";

type StyleNames = "addStory";

const styles = (theme: Theme): StyleSheet<StyleNames> => ({
    addStory: {
        backgroundColor: theme.palette.secondary,
        height: 48,
        width: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: theme.spacing.small
    }
});

class AddStory extends React.Component<StylesProps<StyleNames>> {

    // TODO: fix me
    static defaultProps = {};

    @autobind
    onPress() {
        alert("Not Implemented yet ¯\\_(ツ)_/¯");
    }

    render(): React.Node {
        const {onPress} = this;
        const {styles} = this.props;
        return (
            <TouchableOpacity {...{onPress}}>
                <View style={styles.addStory}>
                    <Icon name="plus" primary={true} />
                </View>
            </TouchableOpacity>
        );
    }
}

export default withStyles(styles, AddStory);
