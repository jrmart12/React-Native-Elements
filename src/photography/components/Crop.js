// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, PanResponder, StyleSheet as RNStyleSheet} from "react-native";

import {withStyles, type StyleProps, type StylesProps, type StyleSheet, type Theme} from "../../components/theme";

type StyleNames = "container" | "topLeftResponder" | "topRightResponder" | "bottomLeftResponder"
 | "bottomRightResponder" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "crop";

type CropProps = StyleProps & StylesProps<StyleNames> & {
    children: React.Node
};

class Crop extends React.PureComponent<CropProps> {

    crop: View;

    topLeftResponder: PanResponder;
    topRightResponder: PanResponder;
    bottomLeftResponder: PanResponder;
    bottomRightResponder: PanResponder;

    lastKnownLeft = 0;
    lastKnownRight = 0;
    lastKnownTop = 0;
    lastKnownBottom = 0;

    widthBoundary: number;
    heightBoundary: number;

    position = {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    @autobind
    setCrop(crop: ?View) {
        if (crop) {
            this.crop = crop;
        }
    }

    setLeft(left: number) {
        if (left <= 0) {
            this.position.left = 0;
        } else if (left >= (this.widthBoundary - this.position.right)) {
            this.position.left = this.widthBoundary - this.position.right;
        } else {
            this.position.left = left;
        }
    }

    setRight(right: number) {
        if (right >= 0) {
            this.position.right = 0;
        } else if (-right >= this.widthBoundary - this.position.left) {
            this.position.right = this.widthBoundary - this.position.left;
        } else {
            this.position.right = -right;
        }
    }

    setTop(top: number) {
        if (top <= 0) {
            this.position.top = 0;
        } else if (top >= this.heightBoundary - this.position.bottom) {
            this.position.top = this.heightBoundary - this.position.bottom;
        } else {
            this.position.top = top;
        }
    }

    setBottom(bottom: number) {
        if (bottom >= 0) {
            this.position.bottom = 0;
        } else if (-bottom >= this.heightBoundary - this.position.top) {
            this.position.bottom = this.heightBoundary - this.position.top;
        } else {
            this.position.bottom = -bottom;
        }
    }

    componentWillMount() {
        const {style} = this.props;
        // $FlowFixMe
        const {width, height} = RNStyleSheet.flatten(style);
        this.widthBoundary = width - boundary;
        this.heightBoundary = height - boundary;

        // Top Left
        this.topLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const {dx, dy} = gestureState;
                const left = this.lastKnownLeft + dx;
                const top = this.lastKnownTop + dy;
                this.setLeft(left);
                this.setTop(top);
                this.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownLeft += gestureState.dx;
                this.lastKnownTop += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownLeft += gestureState.dx;
                this.lastKnownTop += gestureState.dy;
            }
        });

        // Top Right
        this.topRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const {dx, dy} = gestureState;
                const right = this.lastKnownRight + dx;
                const top = this.lastKnownTop + dy;
                this.setRight(right);
                this.setTop(top);
                this.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownRight += gestureState.dx;
                this.lastKnownTop += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownRight += gestureState.dx;
                this.lastKnownTop += gestureState.dy;
            }
        });

        // Bottom Left
        this.bottomLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const {dx, dy} = gestureState;
                const left = this.lastKnownLeft + dx;
                const bottom = this.lastKnownBottom + dy;
                this.setLeft(left);
                this.setBottom(bottom);
                this.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownLeft += gestureState.dx;
                this.lastKnownBottom += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownLeft += gestureState.dx;
                this.lastKnownBottom += gestureState.dy;
            }
        });

        // Bottom Right
        this.bottomRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (e, gestureState) => {
                const {dx, dy} = gestureState;
                const bottom = this.lastKnownBottom + dy;
                const right = this.lastKnownRight + dx;
                this.setRight(right);
                this.setBottom(bottom);
                this.crop.setNativeProps({ style: this.position });
            },
            onPanResponderRelease: (e, gestureState) => {
                this.lastKnownRight += gestureState.dx;
                this.lastKnownBottom += gestureState.dy;
            },
            onPanResponderTerminate: (e, gestureState) => {
                this.lastKnownRight += gestureState.dx;
                this.lastKnownBottom += gestureState.dy;
            }
        });
    }

    render(): React.Node {
        const {style, styles, children} = this.props;
        return (
            <View style={style}>
                <View style={styles.container}>
                    {children}
                </View>
                <View ref={this.setCrop} style={RNStyleSheet.absoluteFill}>
                    <View style={styles.crop} />
                    <View style={styles.topLeftResponder} {...this.topLeftResponder.panHandlers}>
                        <View style={styles.topLeft} />
                    </View>
                    <View style={styles.topRightResponder} {...this.topRightResponder.panHandlers}>
                        <View style={styles.topRight} />
                    </View>
                    <View style={styles.bottomLeftResponder} {...this.bottomLeftResponder.panHandlers}>
                        <View style={styles.bottomLeft} />
                    </View>
                    <View style={styles.bottomRightResponder} {...this.bottomRightResponder.panHandlers}>
                        <View style={styles.bottomRight} />
                    </View>
                </View>
            </View>
        );
    }
}

const boundary = 150;
const touchTargetSize = 44;
const circleSize = 16;
const themedStyles = (theme: Theme): StyleSheet<StyleNames> => ({
    container: {
        position: "absolute",
        top: touchTargetSize,
        left: touchTargetSize,
        right: touchTargetSize,
        bottom: touchTargetSize
    },
    crop: {
        position: "absolute",
        top: touchTargetSize,
        left: touchTargetSize,
        right: touchTargetSize,
        bottom: touchTargetSize,
        borderWidth: 2,
        borderColor: theme.palette.primary
    },
    topLeftResponder: {
        position: "absolute",
        width: touchTargetSize,
        height: touchTargetSize,
        top: touchTargetSize / 2,
        left: touchTargetSize / 2
    },
    topRightResponder: {
        position: "absolute",
        width: touchTargetSize,
        height: touchTargetSize,
        top: touchTargetSize / 2,
        right: touchTargetSize / 2
    },
    bottomLeftResponder: {
        position: "absolute",
        width: touchTargetSize,
        height: touchTargetSize,
        bottom: touchTargetSize / 2,
        left: touchTargetSize / 2
    },
    bottomRightResponder: {
        position: "absolute",
        width: touchTargetSize,
        height: touchTargetSize,
        bottom: touchTargetSize / 2,
        right: touchTargetSize / 2
    },
    topLeft: {
        position: "absolute",
        width: circleSize,
        height: circleSize,
        backgroundColor: theme.palette.primary,
        borderRadius: circleSize / 2,
        top: (touchTargetSize / 2) - (circleSize / 2),
        left: (touchTargetSize / 2) - (circleSize / 2)
    },
    topRight: {
        position: "absolute",
        width: circleSize,
        height: circleSize,
        backgroundColor: theme.palette.primary,
        borderRadius: circleSize / 2,
        top: (touchTargetSize / 2) - (circleSize / 2),
        right: (touchTargetSize / 2) - (circleSize / 2)
    },
    bottomLeft: {
        position: "absolute",
        width: circleSize,
        height: circleSize,
        backgroundColor: theme.palette.primary,
        borderRadius: circleSize / 2,
        bottom: (touchTargetSize / 2) - (circleSize / 2),
        left: (touchTargetSize / 2) - (circleSize / 2)
    },
    bottomRight: {
        position: "absolute",
        width: circleSize,
        height: circleSize,
        backgroundColor: theme.palette.primary,
        borderRadius: circleSize / 2,
        bottom: (touchTargetSize / 2) - (circleSize / 2),
        right: (touchTargetSize / 2) - (circleSize / 2)
    }
});

export default withStyles(themedStyles, Crop);
