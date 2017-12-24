// @flow
import * as React from "react";
import {TabBar} from "../components";

import type {NavigationProps} from "../components/Types";

const tabs = [
    { key: "Recipes", label: "Recipes", icon: "home" },
    { key: "Restaurants", label: "Restaurants", icon: "map" }
];

type FoodTabProps = NavigationProps<>;

export default class FoodTab extends React.Component<FoodTabProps> {

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <TabBar {...{tabs, navigation}} />
        );
    }
}
