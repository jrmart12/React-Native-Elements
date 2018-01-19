// @flow
import * as _ from "lodash";
import * as React from "react";
import {Image as RNImage, Animated, StyleSheet, View, Platform} from "react-native";
import {BlurView} from "expo";
import {observable, computed} from "mobx";
import {observer} from "mobx-react/native";

import CacheManager from "./CacheManager";
import type {StyleProps} from "./theme";

type ImageProps = StyleProps & {
    preview?: string,
    uri: string
};

const propsToCopy = [
    "borderRadius", "borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"
];

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

@observer
export default class Image extends React.Component<ImageProps> {

    @observable _uri: string;
    @observable _intensity: Animated.Value = new Animated.Value(100);

    @computed get uri(): string { return this._uri; }
    set uri(uri: string) { this._uri = uri; }

    @computed get intensity(): Animated.Value { return this._intensity; }
    set intensity(intensity: Animated.Value) { this._intensity = intensity; }

    async load(props: ImageProps): Promise<void> {
        const {uri, preview} = props;
        const ready = CacheManager.cache(uri, newURI => this.uri = newURI);
        if (!ready && preview && Platform.OS === "ios") {
            this.uri = uri;
        }
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(props: ImageProps) {
        this.load(props);
    }

    onLoadEnd(uri: string) {
        const {preview} = this.props;
        const isPreview = uri === preview;
        if (!isPreview && Platform.OS === "ios") {
            this.intensity = new Animated.Value(100);
            Animated.timing(this.intensity, { duration: 300, toValue: 0, useNativeDriver: true }).start();
        }
    }

    render(): React.Node {
        const {style} = this.props;
        const {uri, intensity} = this;
        const computedStyle = [
            StyleSheet.absoluteFill,
            _.pickBy(StyleSheet.flatten(style), (value, key) => propsToCopy.indexOf(key) !== -1)
        ];
        return (
            <View {...{style}}>
                {
                    uri && (
                        <RNImage
                            source={{ uri }}
                            resizeMode="cover"
                            style={computedStyle}
                            onLoadEnd={() => this.onLoadEnd(uri)}
                        />
                    )
                }
                {
                    Platform.OS === "ios" && <AnimatedBlurView tint="dark" style={computedStyle} {...{intensity}} />
                }
            </View>
        );
    }
}
