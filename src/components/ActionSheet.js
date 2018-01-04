// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
    StyleSheet, View, SafeAreaView, Modal, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback
} from "react-native";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {Constants} from "expo";

import Text from "./Text";
import Icon from "./Icon";
import {StyleGuide} from "./theme";

type ActionSheetProps = {
    title: string,
    children: React.Node
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
        const {title, children} = this.props;
        const opacity = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5]
        });
        const translateY = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        });
        return (
            <Modal visible={this.visible} transparent={true} onRequestClose={this.toggle}>
                <View style={styles.modal}>
                    <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}>
                        <TouchableOpacity style={styles.exit} onPress={this.toggle} />
                    </Animated.View>
                    <AnimatedSafeAreaView style={[styles.content, { transform: [{ translateY }]}]}>
                        <TouchableWithoutFeedback onPress={this.toggle}>
                            <View style={styles.header}>
                                <TouchableOpacity style={styles.left} onPress={this.toggle}>
                                    <Icon name="chevron-down" primary={true} />
                                </TouchableOpacity>
                                <Text style={styles.center} type="headline" primary={true}>{title}</Text>
                                <View style={styles.right} />
                            </View>
                        </TouchableWithoutFeedback>
                        {children}
                    </AnimatedSafeAreaView>
                </View>
            </Modal>
        );
    }
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const {height} = Dimensions.get("window");
const duration = 350;
const useNativeDriver = true;
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
        width: 100
    },
    center: {
    },
    right: {
        width: 100
    },
    exit: {
        flex: 1
    }
});
