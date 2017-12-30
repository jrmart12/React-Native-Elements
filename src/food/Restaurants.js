// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {GeoFeed, Activity} from "../components";
import FoodAPI from "./api";

import type {ScreenProps} from "../components/Navigation";
import type {Restaurant} from "./api";

export default class Restaurants extends React.Component<ScreenProps<>> {

    @autobind
    renderItem(restaurant: Restaurant): React.Node {
        const {navigation} = this.props;
        return <Activity {...restaurant} onPress={() => navigation.navigate("Restaurant", { restaurant })} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const markers = FoodAPI.restaurants;
        return (
            <GeoFeed title="Restaurants" {...{markers, navigation, renderItem}} />
        );
    }
}
