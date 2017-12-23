// @flow
import * as _ from "lodash";
import * as React from "react";
import {ScrollView} from "react-native";
import {Container, NavigationBar, Card, API} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Recipes extends React.Component<ScreenProps<>> {

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <Container>
                <NavigationBar title="Recipes" {...{navigation}} />
                <ScrollView>
                {
                    _.map(API.food.categories, (category, key) => <Card {...category} {...{ key }} />)
                }
                </ScrollView>
            </Container>
        );
    }
}
