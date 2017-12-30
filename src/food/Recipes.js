// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Card, Feed} from "../components";

import FoodAPI from "./api";
import type {Category} from "./api";

import type {ScreenProps} from "../components/Navigation";

export default class Recipes extends React.Component<ScreenProps<>> {

    @autobind
    renderItem(category: Category): React.Node {
        const {navigation} = this.props;
        return <Card {...category} onPress={() => navigation.navigate("Category", { categoryId: category.id })} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = FoodAPI.categories;
        const title = "Recipes";
        return (
            <Feed {...{data, renderItem, title, navigation}} />
        );
    }
}
