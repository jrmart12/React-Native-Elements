// @flow
import * as React from "react";
import {Animated, Platform} from "react-native";
import {BlurView as ExpoBlurView} from "expo";

import {type StyleProps} from "./theme";

type BlurViewProps = StyleProps & {
    intensity: Animated.Value
};

export default class BlurView extends React.PureComponent<BlurViewProps> {

    render(): React.Node {
        const {style, intensity} = this.props;
        const opacity = intensity.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 0.75]
        });
        if (Platform.OS === "ios") {
            return (
                <AnimatedBlurView tint="dark" {...{intensity, style}} />
            );
        }
        return (
            <Animated.View style={[style, { backgroundColor: "rgb(0, 0, 0)", opacity }]} />
        );
    }
}

const AnimatedBlurView = Animated.createAnimatedComponent(ExpoBlurView);
