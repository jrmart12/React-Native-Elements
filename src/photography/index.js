// @flow
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {TabNavigatorOptions, StackNavigatorOptions} from "../components/Navigation";

import Photos from "./Photos";
import Photo from "./Photo";

const tabs = [
    { key: "Photos", label: "Photos", icon: "photos" },

];



const PhotosTabNavigator = createBottomTabNavigator({
    Photos: { screen: Photos }
}, TabNavigatorOptions(tabs));

export const PhotographyNavigator = createStackNavigator({
    Photos: { screen: PhotosTabNavigator },
    Photo: { screen: Photo }
}, { ...StackNavigatorOptions, navigationOptions: { gesturesEnabled: false } });
