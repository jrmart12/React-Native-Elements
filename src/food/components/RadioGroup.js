// @flow
import * as React from "react";
import {View, StyleSheet} from "react-native";

import {Button} from "../../components";

type RadioGroupProps = {
    options: string[]
};

type RadioGroupState = {
    selected: number
};

export default class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {

    state = {
        selected: 0
    };

    select = (selected: number) => this.setState({ selected });

    render(): React.Node {
        const {options} = this.props;
        const {selected} = this.state;
        return (
            <View style={styles.container}>
                {
                    options.map((label, key) => (
                        <Button
                            style={styles.button}
                            primary={selected === key}
                            secondary={selected !== key}
                            onPress={() => this.select(key)}
                            {...{label, key}}
                        />
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        shadowOpacity: 0
    }
});
