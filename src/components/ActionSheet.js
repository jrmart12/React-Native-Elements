// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
    StyleSheet, View, Modal, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, Platform
} from "react-native";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {Constants, BlurView} from "expo";

import Text from "./Text";
import Icon from "./Icon";
import {StyleGuide} from "./theme";

type ActionSheetProps = {
    title: string,
    subtitle?: string,
    children: React.Node,
    rightAction?: {
        label: string,
        onPress: () => void
    }
};

@observer
export default class ActionSheet extends React.Component<ActionSheetProps> {

    @observable animation: Animated.Value = new Animated.Value(0);
    @observable visible = false;

    @action show() { this.visible = true; }
    @action hide() { this.visible = false; }

    @autobind toggle() {
        if (!this.visible) {
            this.show();
            Animated.timing(
                this.animation,
                {
                    toValue: 1,
                    duration,
                    useNativeDriver
                }
            ).start();
        } else {
            Animated.timing(
                this.animation,
                {
                    toValue: 0,
                    duration,
                    useNativeDriver
                }
            ).start(() => this.hide());
        }
    }

    render(): React.Node {
        const {title, subtitle, children, rightAction} = this.props;
        const opacity = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5]
        });
        const intensity = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });
        const translateY = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        });
        return (
            <Modal visible={this.visible} transparent onRequestClose={this.toggle}>
                <View style={styles.modal}>
                    {
                        Platform.OS === "android" && (
                            <Animated.View
                                style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
                            >
                                <TouchableOpacity style={styles.exit} onPress={this.toggle} />
                            </Animated.View>
                        )
                    }
                    {
                        Platform.OS === "ios" && (
                            <AnimatedBlurView tint="dark" style={StyleSheet.absoluteFill} {...{intensity}} />
                        )
                    }
                    <Animated.View style={[styles.content, { transform: [{ translateY }]}]}>
                        <TouchableWithoutFeedback onPress={this.toggle}>
                            <View style={styles.header}>
                                <TouchableOpacity style={styles.left} onPress={this.toggle}>
                                    <Icon name="chevron-down" primary />
                                </TouchableOpacity>
                                <View style={styles.center}>
                                    <Text type="headline" style={styles.title} numberOfLines={1} primary>{title}</Text>
                                    {subtitle && (
                                        <Text type="footnote" style={styles.title} numberOfLines={1} primary>
                                            {subtitle}
                                        </Text>
                                    )}
                                </View>
                                <View style={styles.right}>
                                    {
                                        rightAction && (
                                            <TouchableOpacity onPress={rightAction.onPress}>
                                                <Text type="headline" primary>{rightAction.label}</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        );
    }
}

const {height} = Dimensions.get("window");
const duration = 350;
const useNativeDriver = true;
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: StyleGuide.spacing.small,
        paddingVertical: StyleGuide.spacing.tiny,
        borderBottomWidth: 1,
        borderColor: StyleGuide.palette.lightGray
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end"
    },
    content: {
        backgroundColor: "white",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        maxHeight: height - Constants.statusBarHeight
    },
    left: {
        width: 36
    },
    center: {
        flex: 1
    },
    title: {
        textAlign: "center"
    },
    right: {
        minWidth: 36,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    exit: {
        flex: 1
    }
});
