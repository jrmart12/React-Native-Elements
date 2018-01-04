// @flow
import {TabNavigator, StackNavigator} from "react-navigation";

import {TabNavigatorOptions, StackNavigatorOptions} from "../components/Navigation";

import Timeline from "./Timeline";
import Story from "./Story";
import Profile from "./Profile";

const tabs = [
    { key: "Timeline", label: "Timeline", icon: "home" },
    { key: "Messages", label: "Messages", icon: "mail" },
    { key: "Profile", label: "Profile", icon: "user" }
];

const SocialTabNavigator = TabNavigator({
    Timeline: { screen: Timeline },
    Profile: { screen: Profile }
}, TabNavigatorOptions(tabs));

export const SocialNavigator = StackNavigator({
    Home: { screen: SocialTabNavigator },
    Story: { screen: Story }
}, StackNavigatorOptions);
