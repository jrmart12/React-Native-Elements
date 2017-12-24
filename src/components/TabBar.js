// @flow
import * as React from "react";
import {StyleSheet, View, TouchableWithoutFeedback, SafeAreaView} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";

import {withTheme, StyleGuide} from "./Theme";
import type {ThemeProps} from "./Theme";
import type {NavigationProps} from "./Types";

type Tab = {
    key: string,
    label: string,
    icon: string
};

type TabBarProps = ThemeProps & NavigationProps<> & {
    tabs: Tab[]
};

class TabBar extends React.Component<TabBarProps> {

    // TODO: Use React.ElementConfig instead when flow bin 0.62 is available
    // https://flow.org/en/docs/react/types/#toc-react-elementconfig
    static defaultProps = {};

    render(): React.Node {
        const {tabs, navigation, theme} = this.props;
        const activeKey = tabs[navigation.state.index].key;
        return (
            <SafeAreaView style={theme.constants.defaultShadow}>
                <View style={styles.tabs}>
                {
                    tabs.map(tab => (
                        <TouchableWithoutFeedback key={tab.key} onPress={() => navigation.navigate(tab.key)}>
                            <View style={styles.tab}>
                                <Icon
                                    size={theme.constants.iconSize}
                                    name={tab.icon}
                                    color={activeKey === tab.key ? theme.palette.primary : theme.palette.gray}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row",
        height: StyleGuide.constants.barHeight,
        justifyContent: "space-around",
        alignItems: "stretch"
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
});

export default withTheme(TabBar);
