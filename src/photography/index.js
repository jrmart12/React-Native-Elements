// @flow
import {TabNavigator, StackNavigator} from "react-navigation";

import {TabNavigatorOptions, StackNavigatorOptions} from "../components/Navigation";

import Photos from "./Photos";
import Photo from "./Photo";

const tabs = [
    { key: "Photos", label: "Photos", icon: "grid" },
    { key: "Albums", label: "Albums", icon: "layers" },
    { key: "Places", label: "Places", icon: "map" }
];

const PhotosTabNavigator = TabNavigator({
    Photos: { screen: Photos }
}, TabNavigatorOptions(tabs));

export const PhotographyNavigator = StackNavigator({
    Photos: { screen: PhotosTabNavigator },
    Photo: { screen: Photo }
}, StackNavigatorOptions);
