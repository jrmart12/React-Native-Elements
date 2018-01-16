// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, StyleGuide} from "../../components";

type StepProps = {
    index: number,
    track: string
};

export default class Track extends React.Component<StepProps> {

    render(): React.Node {
        const {track, index} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.step}>{`${index}`}</Text>
                <Text style={styles.text}>{track}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    step: {
        marginRight: StyleGuide.spacing.small,
        color: StyleGuide.palette.darkGray
    },
    text: {
        marginRight: StyleGuide.spacing.small
    }
});
