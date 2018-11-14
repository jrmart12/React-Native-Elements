// @flow
import * as React from "react";
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {StackNavigatorOptions, animationEnabled} from "../components/Navigation";

import {MusicTabBar} from "../components/music";

import Library from "./Library";
import Album from "./Album";
import Discovery from "./Discovery";
import Playlist from "./Playlist";
import Profile from "./Profile";

import type {NavigationProps} from "../components/Navigation";

const tabs = [
    { key: "Library", label: "Library", icon: "music" },
    { key: "Discovery", label: "Discovery", icon: "feed" },
    { key: "MusicalProfile", label: "Profile", icon: "account" }
];

const LibraryNavigator = createStackNavigator({
    Library: { screen: Library },
    Album: { screen: Album }
}, StackNavigatorOptions);

const DiscoveryNavigator = createStackNavigator({
    Discovery: { screen: Discovery },
    Playlist: { screen: Playlist }
}, StackNavigatorOptions);

const ProfileNavigator = createStackNavigator({
    MusicalProfile: { screen: Profile },
    ProfileAlbum: { screen: Album },
    ProfilePlaylist: { screen: Playlist }
}, StackNavigatorOptions);

export const MusicNavigator = createBottomTabNavigator({
    Library: { screen: LibraryNavigator },
    Discovery: { screen: DiscoveryNavigator },
    MusicalProfile: { screen: ProfileNavigator }
}, {
    animationEnabled,
    // eslint-disable-next-line react/display-name
    tabBarComponent: ({ navigation }: NavigationProps<>) => <MusicTabBar {...{navigation, tabs}} />,
    tabBarPosition: "bottom",
    swipeEnabled: false
});
