// @flow
import * as React from "react";
import {StyleSheet, View, TouchableOpacity, Animated, Dimensions, Platform, Modal} from "react-native";
import {BlurView} from "expo";

import {StyleGuide} from "./theme";
import Sheet from "./Sheet";

type ActionSheetProps = {
    title: string,
    subtitle?: string,
    children: React.Node,
    noSafeArea: boolean,
    scrollable: boolean,
    rightAction?: {
        label: string,
        onPress: () => mixed
    }
};

type ActionSheetState = {
    animation: Animated.Value,
    visible: boolean
};

export default class ActionSheet extends React.Component<ActionSheetProps, ActionSheetState> {

    static defaultProps = {
        scrollable: false,
        noSafeArea: false,
        subtitle: undefined,
        rightAction: undefined
    };

    state = {
        animation: new Animated.Value(0),
        visible: false
    };

    setVisibility = (visible: boolean): Promise<void> => new Promise(r => this.setState({ visible }, r));

    onRequestClose = () => this.toggle();

    async toggle(): Promise<void> {
        const {animation, visible} = this.state;
        if (!visible) {
            await this.setVisibility(true);
        }
        Animated.timing(
            animation,
            {
                toValue: visible ? 0 : 1,
                duration,
                useNativeDriver
            }
        ).start(() => {
            if (visible) {
                this.setVisibility(false);
            }
        });
    }

    render(): React.Node {
        const {onRequestClose} = this;
        const {title, subtitle, rightAction, children, noSafeArea, scrollable} = this.props;
        const {animation, visible} = this.state;
        const opacity = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5]
        });
        const intensity = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });
        const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        });
        return (
            <Modal onRequestClose={onRequestClose} transparent {...{visible}}>
                <View style={styles.modal}>
                    {
                        Platform.OS === "android" && (
                            <Animated.View
                                style={{
                                    ...StyleSheet.absoluteFillObject,
                                    backgroundColor: StyleGuide.palette.black,
                                    opacity
                                }}
                            >
                                <TouchableOpacity style={styles.exit} onPress={onRequestClose} />
                            </Animated.View>
                        )
                    }
                    {
                        Platform.OS === "ios" && (
                            <AnimatedBlurView tint="dark" style={StyleSheet.absoluteFill} {...{intensity}}>
                                <TouchableOpacity style={styles.exit} onPress={onRequestClose} />
                            </AnimatedBlurView>
                        )
                    }
                    <AnimatedSheet
                        style={{ transform: [{ translateY }] }}
                        {...{toggle: onRequestClose, title, subtitle, rightAction, noSafeArea, scrollable}}
                    >
                        {children}
                    </AnimatedSheet>
                </View>
            </Modal>
        );
    }
}

const {height} = Dimensions.get("window");
const duration = 350;
const useNativeDriver = Platform.OS === "android";
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedSheet = Animated.createAnimatedComponent(Sheet);
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "flex-end"
    },
    exit: {
        flex: 1
    }
});
