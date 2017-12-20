// @flow
/* eslint-disable no-console */
import autobind from "autobind-decorator";
import * as React from "react";
import {Font, AppLoading} from "expo";

import {FoodNavigator} from "./src/food";

type AppState = {
    ready: boolean
};

export default class App extends React.Component<{}, AppState> {

    async componentWillMount(): Promise<void> {
        this.setState({ ready: false });
        await Font.loadAsync({
            "SFProText-Medium": require("./fonts/SF-Pro-Text-Medium.otf"),
            "SFProText-Heavy": require("./fonts/SF-Pro-Text-Heavy.otf"),
            "SFProText-Bold": require("./fonts/SF-Pro-Text-Bold.otf"),
            "SFProText-Semibold": require("./fonts/SF-Pro-Text-Semibold.otf"),
            "SFProText-Regular": require("./fonts/SF-Pro-Text-Regular.otf"),
            "SFProText-Light": require("./fonts/SF-Pro-Text-Light.otf")
        });
        this.setState({ ready: true });
    }

    render(): React.Node {
        const {onNavigationStateChange} = this;
        const {ready} = this.state;
        if (!ready) {
            return <AppLoading />;
        } else {
            return <FoodNavigator {...{onNavigationStateChange}} />;
        }
    }

    @autobind
    onNavigationStateChange() {
        return undefined;
    }
}
