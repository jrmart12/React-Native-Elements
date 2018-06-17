// @flow
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {StackNavigatorOptions, TabNavigatorOptions} from "../components/Navigation";

import Cities from "./Cities";
import City from "./City";
import Restaurants from "./Restaurants";
import Hotels from "./Hotels";
import Guides from "./Guides";
import Guide from "./Guide";

const tabs = [
    { key: "Guides", label: "Guides", icon: "feed" },
    { key: "Cities", label: "Cities", icon: "cities" }
];

const CitiesNavigator = createStackNavigator({
    Cities: { screen: Cities },
    City: { screen: City },
    Restaurants: { screen: Restaurants },
    Hotels: { screen: Hotels }
}, StackNavigatorOptions);

const GuidesNavigator = createStackNavigator({
    Guides: { screen: Guides },
    Guide: { screen: Guide }
}, StackNavigatorOptions);

export const TravelNavigator = createBottomTabNavigator({
    Guides: { screen: GuidesNavigator },
    Cities: { screen: CitiesNavigator }
}, TabNavigatorOptions(tabs));
