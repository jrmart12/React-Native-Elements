// @flow
/* eslint-disable no-console */
import autobind from "autobind-decorator";
import * as React from "react";
import {StatusBar, Platform} from "react-native";
import {useStrict} from "mobx";
import {Provider} from "mobx-react/native";
import {Font, AppLoading} from "expo";
import {Feather} from "@expo/vector-icons";

import {Images, createTheme, Colors} from "./src/components";
import {FoodNavigator} from "./src/food";

useStrict(true);

type AppProps = {};

type AppState = {
    ready: boolean
};

export default class App extends React.Component<AppProps, AppState> {

    async componentWillMount(): Promise<void> {
        this.setState({ ready: false });
        const fonts = Font.loadAsync({
            "SFProText-Bold": require("./fonts/SF-Pro-Text-Bold.otf"),
            "SFProText-Semibold": require("./fonts/SF-Pro-Text-Semibold.otf"),
            "SFProText-Regular": require("./fonts/SF-Pro-Text-Regular.otf")
        });
        const images = Images.downloadAsync();
        const icons = Font.loadAsync(Feather.font);
        await Promise.all([fonts, ...images, icons]);
        this.setState({ ready: true });
    }

    @autobind
    onNavigationStateChange() {
        return undefined;
    }

    render(): React.Node {
        const {onNavigationStateChange} = this;
        const {ready} = this.state;
        if (!ready) {
            return <AppLoading />;
        } else {
            StatusBar.setBarStyle("light-content");
            if (Platform.OS === "android") {
                StatusBar.setBackgroundColor(Colors.food.primary);
            }
            return (
                <Provider theme={createTheme(Colors.food)}>
                    <FoodNavigator {...{onNavigationStateChange}} />
                </Provider>
            );
        }
    }
}
