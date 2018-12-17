// @flow
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {TabNavigatorOptions, StackNavigatorOptions} from "../components/Navigation";

import Profile from "./Profile";

const tabs = [
    { key: "Profile", label: "Profile", icon: "account" }
];

const SocialTabNavigator = createBottomTabNavigator({
    Profile: { screen: Profile }
}, TabNavigatorOptions(tabs));

export const SocialNavigator = createStackNavigator({
 Home: { screen: SocialTabNavigator }
}, StackNavigatorOptions);
