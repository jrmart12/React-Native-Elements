// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Text, IconButton, StyleGuide, notImplementedYet} from "../../components";

type StepProps = {
    index: number,
    track: string
};

export default class Track extends React.PureComponent<StepProps> {

    render(): React.Node {
        const {track, index} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.step}>{`${index}`}</Text>
                <Text style={styles.track}>{track}</Text>
                <IconButton name="more-horizontal" primary onPress={notImplementedYet} />
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
    track: {
        marginRight: StyleGuide.spacing.small,
        flex: 1,
        flexWrap: "wrap"
    }
});
