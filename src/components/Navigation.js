// @flow
import * as React from "react";

import TabBar from "./TabBar";
import type {Tabs} from "./TabBar";

import type {
    // eslint-disable-next-line no-unused-vars
    NavigationNavigatorProps, NavigationScreenProp, NavigationState
} from "react-navigation/src/TypeDefinition";

export type ScreenProps<O: {} = {}, S: {} = NavigationState> = NavigationNavigatorProps<O, S>;

export type NavigationProps<S: {} = NavigationState> = {
    navigation: NavigationScreenProp<S>
};

export type ScreenParams<P> = ScreenProps<{}, { params: P }>;

export const StackNavigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

export const TabNavigatorOptions = (tabs: Tabs) => ({
    animationEnabled: false,
    // eslint-disable-next-line react/display-name
    tabBarComponent: ({ navigation }: NavigationProps<>) => <TabBar {...{navigation, tabs}} />,
    tabBarPosition: "bottom"
});
