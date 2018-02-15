// @flow
import * as React from "react";

import {GeoFeed, Activity, notImplementedYet, type NavigationProps} from "../components";
import {type City, type Hotel} from "./api";

export default class Hotels extends React.PureComponent<NavigationProps<{ city: City }>> {

    render(): React.Node {
        const {navigation} = this.props;
        const {city} = navigation.state.params;
        const markers = city.restaurants;
        return (
            <GeoFeed
                title="Hotels"
                defaultCoordinates={city.location}
                back={city.city}
                {...{markers, navigation, renderItem}}
            />
        );
    }
}

const renderItem = (restaurant: Hotel): React.Node => <Activity {...restaurant} onPress={notImplementedYet} />;
