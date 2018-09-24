// @flow
import * as React from "react";
import {StyleSheet, Animated, Dimensions} from "react-native";

import {Sheet} from "../../components";

type PhotoActionSheetProps = {
    title: string,
    children: React.Node,
    onClose: () => mixed
};

type PhotoActionSheetState = {
    animation: Animated.Value,
    visible: boolean
};

export default class PhotoActionSheet extends React.Component<PhotoActionSheetProps, PhotoActionSheetState> {

    state = {
        animation: new Animated.Value(0),
        visible: false
    };

    setVisibility = (visible: boolean): Promise<void> => new Promise(r => this.setState({ visible }, r));

    toggle = async () => {
        const {onClose} = this.props;
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
                onClose();
            }
        });
    }

    render(): React.Node {
        const {toggle} = this;
        const {children, title} = this.props;
        const {animation} = this.state;
        const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        });
        return (
            <AnimatedSheet style={[styles.sheet, { transform: [{ translateY }] }]} {...{title, toggle}}>
                {children}
            </AnimatedSheet>
        );
    }
}

const {height} = Dimensions.get("window");
const AnimatedSheet = Animated.createAnimatedComponent(Sheet);
const duration = 350;
const useNativeDriver = true;
const styles = StyleSheet.create({
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    }
});
