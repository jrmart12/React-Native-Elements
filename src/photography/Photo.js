// @flow
import autobind from "autobind-decorator";
import moment from "moment";
import * as React from "react";
import {StyleSheet, View, Animated, Dimensions, Image as RNImage, Platform, StatusBar} from "react-native";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";

import {
    NavigationBar, Image, IconButton, Footer, Sheet, notImplementedYet, withTheme, type NavigationProps, type ThemeProps
} from "../components";

import {Filters, Filter, type FilterName} from "./components";
import type {Photo} from "./api";

type PhotoScreenProps = NavigationProps<{ photo: Photo, from: string }> & ThemeProps;

@observer
class PhotoScreen extends React.Component<PhotoScreenProps> {

    @observable animation: Animated.Value = new Animated.Value(0);
    @observable visible = false;
    @observable aspectRatio = 1;
    @observable filter: FilterName;

    @action show() { this.visible = true; }
    @action hide() { this.visible = false; }

    @autobind @action
    switchFilter(filter: FilterName) {
        this.filter = filter;
    }

    @autobind @action
    setAspectRatio(width: number, height: number) {
        this.aspectRatio = width / height;
    }

    @autobind toggleFilters() {
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

    componentWillMount() {
        const {photo} = this.props.navigation.state.params;
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("black");
        }
        // Fix getSize is already invoked somewhere in gl-react-expo
        RNImage.getSize(photo.urls.preview, this.setAspectRatio, () => this.setAspectRatio(1, 1));
    }

    componentWillUnmount() {
        const {theme} = this.props;
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor(theme.palette.primary);
        }
    }

    render(): React.Node {
        const {aspectRatio, toggleFilters, switchFilter, filter: name} = this;
        const {navigation} = this.props;
        const {photo, from} = navigation.state.params;
        const date = moment(photo.created_at).format("DD MMMM YYYY · HH:mm");
        const title = photo.location ? photo.location.name : "";
        const subtitle = date;
        const translateY = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0]
        });
        return (
            <View style={styles.container}>
                <Image preview={photo.urls.preview} uri={photo.urls.regular} style={styles.image} />
                <Filter style={styles.image} uri={photo.urls.regular} {...{aspectRatio, name}} />
                <NavigationBar type="transparent" back={from} withGradient {...{navigation, title, subtitle}} />
                {
                    <Footer>
                        <IconButton name="sliders" onPress={toggleFilters} />
                        <IconButton name="crop" onPress={notImplementedYet} />
                    </Footer>
                }
                <AnimatedSheet
                    title="Filters"
                    toggle={this.toggleFilters}
                    style={[styles.sheet, { transform: [{ translateY }] }]}
                >
                    <Filters {...{photo, aspectRatio, switchFilter}} />
                </AnimatedSheet>
            </View>
        );
    }
}

const {height} = Dimensions.get("window");
const AnimatedSheet = Animated.createAnimatedComponent(Sheet);
const duration = 350;
const useNativeDriver = true;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    image: {
        ...StyleSheet.absoluteFillObject
    },
    sheet: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    }
});

export default withTheme(PhotoScreen);
