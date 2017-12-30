// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {FlatList, StyleSheet, View, Animated} from "react-native";
import {observable} from "mobx";
import {observer} from "mobx-react/native";

import NavigationBar from "./NavigationBar";
import Text from "./Text";
import {withTheme, StyleGuide} from "./theme";

import type {ThemeProps} from "./theme";
import type {NavigationProps} from "./Navigation";

type Item = {
    id: string
};

type FeedProps<T> = ThemeProps & NavigationProps<*> & {
    data: T[],
    renderItem: T => React.Node,
    title: string,
    back?: string
};

@observer
class Feed<T: Item> extends React.Component<FeedProps<T>> {

    static defaultProps = {};

    @observable scrollAnimation = new Animated.Value(0);

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
        const {keyExtractor, renderItem, scrollAnimation} = this;
        const {data, title, navigation, theme, back} = this.props;
        const translateY = scrollAnimation.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [-1, 0, 0]
        });
        const textTranslation = scrollAnimation.interpolate({
            inputRange: [0, 55, 56, 57],
            outputRange: [55, 55, 0, 0]
        });
        const onScroll = Animated.event(
            [{
                nativeEvent: {
                    contentOffset: {
                        y: scrollAnimation
                    }
                }
            }],
            { useNativeDriver: true }
        );
        const titleStyle = back ? {} : { transform: [{ translateY: textTranslation }]};
        return (
            <View style={styles.root}>
            <NavigationBar
                {...{ navigation, title, back, titleStyle}}
             />
            <AnimatedFlatList
                style={styles.list}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={(
                    !back && (<Animated.View
                        style={[{ transform: [{translateY}], backgroundColor: theme.palette.primary }, styles.header]}
                    >
                        <Text type="title1" style={styles.headerText}>{title}</Text>
                    </Animated.View>)
                )}
                scrollEventThrottle={1}
                {...{ data, keyExtractor, renderItem, onScroll }}
            />
            </View>
        );
    }
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    list: {
        backgroundColor: StyleGuide.palette.lightGray
    },
    container: {
        paddingBottom: StyleGuide.spacing.small
    },
    header: {
        padding: StyleGuide.spacing.small
    },
    headerText: {
        color: "white"
    }
});

export default withTheme(Feed);
