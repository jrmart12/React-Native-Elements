// @flow
import * as _ from "lodash";
import * as React from "react";
import {Image as RNImage, Animated, StyleSheet, View, Platform} from "react-native";
import {BlurView, FileSystem} from "expo";
import SHA1 from "crypto-js/sha1";
import {observable, computed} from "mobx";
import {observer} from "mobx-react/native";

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
    set uri(uri: string) { this._uri = uri }

    @computed get intensity(): Animated.Value { return this._intensity; }
    set intensity(intensity: Animated.Value) { this._intensity = intensity; }

    async componentWillMount(): Promise<void> {
        const {preview, uri} = this.props;
        try {
            const entry = await getCacheEntry(uri);
            if (!entry.exists) {
                if (preview && Platform.OS === "ios") {
                    this.uri = preview;
                }
                if (uri.startsWith("file://")) {
                    await FileSystem.copyAsync({ from: uri, to: entry.path });
                } else {
                    await FileSystem.downloadAsync(uri, entry.path);
                }
            }
            this.uri = entry.path;
        } catch(e) {
            this.uri = uri;
        }
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
                    Platform.OS === "ios" && <AnimatedBlurView tint="default" style={computedStyle} {...{intensity}} />
                }
            </View>
        );
    }
}

const getCacheEntry = async(uri): Promise<{ exists: boolean, path: string }> => {
    const ext = uri.substring(uri.lastIndexOf("."), uri.indexOf("?") === -1 ? undefined : uri.indexOf("?"));
    const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
    const info = await FileSystem.getInfoAsync(path);
    const {exists} = info;
    return { exists, path };
}
