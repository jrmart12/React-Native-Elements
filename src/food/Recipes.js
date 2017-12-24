// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Container, NavigationBar, Card, List, API} from "../components";

import type {Category} from "../components/API";
import type {ScreenProps} from "../components/Types";

export default class Recipes extends React.Component<ScreenProps<>> {

    @autobind
    renderItem(item: Category): React.Node {
        return <Card {...item} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = API.food.categories;
        const title = "Recipes";
        return (
            <Container>
                <NavigationBar {...{navigation, title}} />
                <List {...{data, renderItem, title}} />
            </Container>
        );
    }
}
