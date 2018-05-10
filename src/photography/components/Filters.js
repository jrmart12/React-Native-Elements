// @flow
import * as React from "react";
import {StyleSheet, ScrollView, TouchableOpacity, View} from "react-native";

import {StyleGuide} from "../../components";

import Filter, {type FilterName} from "./Filter";

type FiltersProps = {
    uri: string,
    switchFilter: FilterName => mixed
};

export default class Filters extends React.PureComponent<FiltersProps> {

    render(): React.Node {
        const {uri, switchFilter} = this.props;
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={styles.root}
                contentContainerStyle={styles.content}
                horizontal
            >
                {
                    filters.map(name => (
                        <TouchableOpacity key={name} onPress={() => switchFilter(name)}>
                            <View>
                                <Filter style={styles.filter} {...{name, uri}} />
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    }
}

const filters = ["saturate", "sepia", "warm", "walden", "brannan", "valencia"];
const styles = StyleSheet.create({
    root: {
        height: 120 + (StyleGuide.spacing.small * 2)
    },
    content: {
        paddingRight: StyleGuide.spacing.small
    },
    filter: {
        width: 120,
        height: 120,
        marginVertical: StyleGuide.spacing.tiny,
        marginLeft: StyleGuide.spacing.tiny
    }
});
