// @flow
import moment from "moment";
import * as React from "react";
import {View} from "react-native";
import RNDatePicker from "react-native-datepicker";

import {withStyles, StyleGuide} from "./theme";

import type {Theme, StyleSheet, StylesProps} from "./theme";

type StyleNames = "button" | "datePicker" | "dateInput" | "dateText" | "dateTouchBody" | "btnTextConfirm"
 | "btnTextCancel";

const themedStyles = (theme: Theme): StyleSheet<StyleNames> => ({
    button: {
        backgroundColor: theme.palette.secondary,
        ...StyleGuide.styles.button
    },
    datePicker: {
        ...StyleGuide.styles.barHeight,
        flex: 1
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
        color: theme.palette.primary,
        height: 20
    },
    btnTextCancel: {
        height: 20
    }
});

type DatePickerState = {
    date: string
};

class DatePicker extends React.Component<StylesProps<StyleNames>, DatePickerState> {

    state = {
        date: moment().format("MMMM Do")
    };

    onDateChange = (date: string) => this.setState({ date });

    render(): React.Node {
        const {onDateChange} = this;
        const {styles} = this.props;
        const {date} = this.state;
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
                    {...{date, onDateChange}}
                />
            </View>
        );
    }
}

export default withStyles(themedStyles, DatePicker);
