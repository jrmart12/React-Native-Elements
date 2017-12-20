// @flow
import * as React from "react";
import {StyleSheet, View, Text} from "react-native";

import {Container, NavigationBar} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Recipes extends React.Component<ScreenProps<>> {

    render(): React.Node {
        return (
            <Container>
                <NavigationBar title="Title" />
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
