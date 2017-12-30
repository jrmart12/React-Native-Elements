// @flow
import * as React from "react";
import {View} from "react-native";
import {default as RNDatePicker} from "react-native-datepicker";

import {withStyles, StyleGuide} from "./theme";

import type {Theme, StyleSheet, StylesProps} from "./theme";

type StyleNames = "button" | "datePicker" | "dateInput" | "dateText" | "dateTouchBody" | "btnTextConfirm";

const styles = (theme: Theme): StyleSheet<StyleNames> => ({
    button: {
        backgroundColor: theme.palette.secondary,
        ...StyleGuide.styles.button
    },
    datePicker: {
        height: 44,
    },
    dateInput: {
        borderWidth: 0
    },
    dateText: {
        ...theme.typography.body,
        color: theme.palette.primary,
        shadowOpacity: 0
    },
    dateTouchBody: {
        flex: 1
    },
    btnTextConfirm: {
        color: theme.palette.primary
    }
});

class DatePicker extends React.Component<StylesProps<StyleNames>> {

    // TODO: FIX ME
    static defaultProps = {};

    render(): React.Node {
        const {styles} = this.props;
        return (
            <View style={styles.button}>
                <RNDatePicker
                    mode="date"
                    style={styles.datePicker}
                    customStyles={styles}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    format="MMMM Do"
                    showIcon={false}
                />
            </View>
        );
    }
}

export default withStyles(styles, DatePicker);
