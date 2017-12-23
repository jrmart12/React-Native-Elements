// @flow
/* eslint-disable no-console */
import autobind from "autobind-decorator";
import * as React from "react";
import {StatusBar} from "react-native";
import {Provider} from "mobx-react/native";
import {Font, AppLoading} from "expo";
import {Feather} from "@expo/vector-icons";

import {createTheme, primaryColors} from "./src/components";
import {FoodNavigator} from "./src/food";

type AppProps = {};

type AppState = {
    ready: boolean
};

export default class App extends React.Component<AppProps, AppState> {

    async componentWillMount(): Promise<void> {
        StatusBar.setBarStyle("light-content");
        this.setState({ ready: false });
        const fonts = Font.loadAsync({
            "SFProText-Bold": require("./fonts/SF-Pro-Text-Bold.otf"),
            "SFProText-Semibold": require("./fonts/SF-Pro-Text-Semibold.otf"),
            "SFProText-Regular": require("./fonts/SF-Pro-Text-Regular.otf")
        });
        const icons = Font.loadAsync(Feather.font);
        await Promise.all([fonts, icons]);
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
            return (
                <Provider theme={createTheme(primaryColors.food)}>
                    <FoodNavigator {...{onNavigationStateChange}} />
                </Provider>
            );
        }
    }
}
