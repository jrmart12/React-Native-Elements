// @flow
import * as React from "react";
import {StyleSheet, View, TouchableWithoutFeedback} from "react-native";
import {inject} from "mobx-react/native";
import {Feather as Icon} from "@expo/vector-icons";

import type {ThemeProps, NavigationProps} from "./Types";

type Tab = {
    key: string,
    label: string,
    icon: string
};

type TabBarProps = ThemeProps & NavigationProps<> & {
    tabs: Tab[],
    activeKey: string
};

@inject("theme")
export default class TabBar extends React.Component<TabBarProps> {

    render(): React.Node {
        const {tabs, navigation, activeKey, theme} = this.props;
        return (
            <View style={styles.tabs}>
            {
                tabs.map(tab => (
                    <TouchableWithoutFeedback key={tab.key} onPress={() => navigation.navigate(tab.key)}>
                        <View style={styles.tab}>
                            <Icon
                                name={tab.icon}
                                color={activeKey === tab.key ? theme.palette.primary : theme.palette.grey}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row"
    },
    tab: {

    }
});
