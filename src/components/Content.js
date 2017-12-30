// @flow
import * as React from "react";
import {StyleSheet, ScrollView} from "react-native";

import {StyleGuide} from "./theme";

type ContentProps = {
    children: React.Node,
    gutter?: boolean
};

export default class Content extends React.Component<ContentProps> {

    render(): React.Node {
        const {children, gutter} = this.props;
        const contentContainerStyle = { padding: gutter ? StyleGuide.spacing.small : 0 };
        return (
            <ScrollView style={styles.container} {...{contentContainerStyle}}>
                {children}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: StyleGuide.palette.lightGray
    }
});
