// @flow
import * as React from "react";
import autobind from "autobind-decorator";
import {SafeAreaView, View, Animated, StyleSheet} from "react-native";

import LeftAction from "./LeftAction";
import Text from "./Text";
import IconButton from "./IconButton";
import {withTheme, StyleGuide} from "./theme";

import type {StyleObj as Style} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import type {ThemeProps} from "./theme";
import type {NavigationProps} from "./Navigation";
import type {Action} from "./Model";

type NavigationBarType = "opaque" | "transparent";

type NavigationBarProps = ThemeProps & NavigationProps<*> & {
    title: string,
    type: NavigationBarType,
    titleStyle?: Style,
    back?: string,
    rightAction?: Action
};

class NavigationBar extends React.Component<NavigationBarProps> {

    static defaultProps = {
        type: "opaque",
        title: ""
    };

    @autobind
    goBack() {
        const {navigation} = this.props;
        navigation.goBack();
    }

    render(): React.Node {
        const {type, title, theme, back, titleStyle, rightAction} = this.props;
        const containerStyle = {
            backgroundColor: type === "opaque" ? theme.palette.primary : "transparent"
        };
        return (
            <SafeAreaView style={containerStyle}>
                <View style={styles.content}>
                    <View style={styles.block}>
                    {back && <LeftAction onPress={this.goBack} name="chevron-left" label={back} />}
                    </View>
                    {
                        title !== "" && (
                            <View style={styles.block}>
                                <AnimatedText type="headline" color="white" style={[styles.text, titleStyle]}>
                                {title}
                                </AnimatedText>
                            </View>
                        )
                    }
                    <View style={styles.rightBlock}>
                    {
                        rightAction && (
                            <IconButton
                                onPress={rightAction.onPress}
                                name={rightAction.icon}
                                style={styles.rightAction}
                            />
                        )
                    }
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        ...StyleGuide.styles.barHeight,
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        textAlign: "center"
    },
    block: {
        flex: 1
    },
    rightBlock: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    header: {
        padding: StyleGuide.spacing.small
    },
    rightAction: {
        marginRight: StyleGuide.spacing.small
    }
});

const AnimatedText = Animated.createAnimatedComponent(Text);
export default withTheme(NavigationBar);
