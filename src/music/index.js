// @flow
import * as React from "react";
import {Provider} from "mobx-react/native";
import {TabNavigator, StackNavigator} from "react-navigation";

import {StackNavigatorOptions} from "../components/Navigation";

import {MusicTabBar, Player} from "./components";

import Library from "./Library";
import Album from "./Album";

import type {NavigationProps} from "../components/Navigation";

const tabs = [
    { key: "Library", label: "Library", icon: "music" },
    { key: "Discovery", label: "Discovery", icon: "book" },
    { key: "MusicalProfile", label: "Profile", icon: "user" }
];

const LibraryNavigator = StackNavigator({
    Library: { screen: Library },
    Album: { screen: Album }
}, StackNavigatorOptions);

export const MusicTabNavigator = TabNavigator({
    Library: { screen: LibraryNavigator }
}, {
    animationEnabled: false,
    // eslint-disable-next-line react/display-name
    tabBarComponent: ({ navigation }: NavigationProps<>) => <MusicTabBar {...{navigation, tabs}} />,
    tabBarPosition: "bottom",
    swipeEnabled: false
});

export class MusicNavigator extends React.Component<{}> {
    render(): React.Node {
        return (
            <Provider player={new Player()}>
                <MusicTabNavigator />
            </Provider>
        );
    }
}
