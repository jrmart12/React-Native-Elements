// @flow
import * as React from "react";
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import type {
    // eslint-disable-next-line no-unused-vars
    NavigationNavigatorProps, NavigationScreenProp, NavigationState
} from "react-navigation/src/TypeDefinition";
import type {Theme} from "./Theme";

export type ScreenProps<O: {} = {}, S: {} = NavigationState> = NavigationNavigatorProps<O, S>;

export type NavigationProps<S: {} = NavigationState> = {
    navigation: NavigationScreenProp<S>
};

export type ScreenParams<P> = ScreenProps<{}, { params: P }>;

export type StyleProps = {
    style?: StyleObj
};

export type ChildrenProps = {
    children?: React.ChildrenArray<React.Element<*>>
};

export type ThemeProps = {
    theme: Theme
};
