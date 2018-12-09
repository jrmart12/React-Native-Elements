// @flow
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {TabNavigatorOptions, StackNavigatorOptions} from "../components/Navigation";

import Photos from "./Photos";
import Photo from "./Photo";

const tabs = [
    { key: "Photos", label: "Photos", icon: "photos" },
    //{ key: "Albums", label: "Albums", icon: "albums" },
    //{ key: "Places", label: "Places", icon: "map" }
];



const PhotosTabNavigator = createBottomTabNavigator({
    Photos: { screen: Photos },
    //Albums: { screen: AlbumsNavigator },
    //Places: { screen: PlacesNavigator }
}, TabNavigatorOptions(tabs));

export const PhotographyNavigator = createStackNavigator({
    Photos: { screen: PhotosTabNavigator },
    Photo: { screen: Photo }
}, { ...StackNavigatorOptions, navigationOptions: { gesturesEnabled: false } });
