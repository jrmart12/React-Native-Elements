// @flow
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {TabNavigatorOptions, StackNavigatorOptions} from "../components/Navigation";

import Photos from "./Photos";
import Photo from "./Photo";
import Albums from "./Albums";
import Album from "./Album";
import Places from "./Places";
import Place from "./Place";
import Camera from "./Camera";

const tabs = [
    { key: "Photos", label: "Photos", icon: "grid" },
    { key: "Albums", label: "Albums", icon: "layers" },
    { key: "Places", label: "Places", icon: "map" }
];

const AlbumsNavigator = createStackNavigator({
    Albums: { screen: Albums },
    Album: { screen: Album }
}, StackNavigatorOptions);

const PlacesNavigator = createStackNavigator({
    Places: { screen: Places },
    Place: { screen: Place }
}, StackNavigatorOptions);

const PhotosTabNavigator = createBottomTabNavigator({
    Photos: { screen: Photos },
    Albums: { screen: AlbumsNavigator },
    Places: { screen: PlacesNavigator }
}, TabNavigatorOptions(tabs));

export const PhotographyNavigator = createStackNavigator({
    Photos: { screen: PhotosTabNavigator },
    Photo: { screen: Photo },
    Camera: { screen: Camera }
}, { ...StackNavigatorOptions, navigationOptions: { gesturesEnabled: false } });
