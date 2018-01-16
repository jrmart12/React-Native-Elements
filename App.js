// @flow
/* eslint-disable no-console */
import autobind from "autobind-decorator";
import * as React from "react";
import {useStrict, observable, action} from "mobx";
import {Provider} from "mobx-react/native";
import {StackNavigator} from "react-navigation";
import {observer} from "mobx-react/native";
import {Font, AppLoading} from "expo";
import {Feather} from "@expo/vector-icons";

import {Images, createTheme} from "./src/components";
import {StackNavigatorOptions} from "./src/components/Navigation";

import {Welcome} from "./src/welcome";
import {FoodNavigator} from "./src/food";
import {SocialNavigator} from "./src/social";
import {MusicNavigator} from "./src/music";

useStrict(true);

@observer
export default class App extends React.Component<{}> {

    @observable isReady = false;
    @action ready() { this.isReady = true; }

    async componentWillMount(): Promise<void> {
        const fonts = Font.loadAsync({
            "SFProText-Bold": require("./fonts/SF-Pro-Text-Bold.otf"),
            "SFProText-Semibold": require("./fonts/SF-Pro-Text-Semibold.otf"),
            "SFProText-Regular": require("./fonts/SF-Pro-Text-Regular.otf")
        });
        const images = Images.downloadAsync();
        const icons = Font.loadAsync(Feather.font);
        await Promise.all([fonts, ...images, icons]);
        this.ready();
    }

    @autobind
    onNavigationStateChange() {}

    render(): React.Node {
        const {isReady, onNavigationStateChange} = this;
        if (!isReady) {
            return <AppLoading />;
        } else {
            return (
                <Provider theme={createTheme()}>
                    <MainNavigator {...{onNavigationStateChange}} />
                </Provider>
            );
        }
    }
}

const MainNavigator = StackNavigator({
    Welcome: { screen: Welcome },
    Food: { screen: FoodNavigator },
    Social: { screen: SocialNavigator },
    Music: { screen: MusicNavigator }
}, StackNavigatorOptions);
