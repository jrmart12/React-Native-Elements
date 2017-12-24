// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {FlatList, StyleSheet} from "react-native";

import {StyleGuide} from "./Theme";

type Item = {
    id: string
};

type ListProps<T> = {
    data: T[],
    renderItem: T => React.Node
};

export default class List<T: Item> extends React.Component<ListProps<T>> {

    @autobind
    keyExtractor(item: T): string {
        return item.id;
    }

    @autobind
    renderItem({ item }: { item: T }): React.Node {
        const {renderItem} = this.props;
        return renderItem(item);
    }

    render(): React.Node {
        const {keyExtractor, renderItem} = this;
        const {data} = this.props;
        return (
            <FlatList
                style={styles.list}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                {...{ data, keyExtractor, renderItem }}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: StyleGuide.palette.lighterGray
    },
    container: {
        paddingVertical: StyleGuide.spacing.small
    }
});
