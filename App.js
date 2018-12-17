// @flow
import * as React from "react";
import {StatusBar, Platform,   TouchableHighlight} from "react-native";
import {createSwitchNavigator, createAppContainer} from "react-navigation";
import {Font, AppLoading} from "expo";

import {Images, loadIcons, ThemeProvider} from "./src/components";

import {Welcome} from "./src/welcome";
import {FoodNavigator} from "./src/food";
import {SocialNavigator} from "./src/social";
import {MusicNavigator} from "./src/music";
import {PhotographyNavigator} from "./src/photography";
import {TravelNavigator} from "./src/travel";
import {PlayerProvider} from "./src/components/music";
//social
import {  StyleSheet, Text, View, Button, Linking, Image } from "react-native";

// $FlowFixMe
const SFProTextBold = require("./fonts/SF-Pro-Text-Bold.otf");
// $FlowFixMe
const SFProTextSemibold = require("./fonts/SF-Pro-Text-Semibold.otf");
// $FlowFixMe
const SFProTextRegular = require("./fonts/SF-Pro-Text-Regular.otf");

const onNavigationStateChange = () => undefined;

type AppProps = {};
type AppState = {
    isReady: boolean
};

export default class App extends React.Component<AppProps, AppState> {

    state = {
        isReady: false
    };

    ready() { this.setState({ isReady: true }); }

    async componentDidMount(): Promise<void> {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
        const fonts = Font.loadAsync({
            "SFProText-Bold": SFProTextBold,
            "SFProText-Semibold": SFProTextSemibold,
            "SFProText-Regular": SFProTextRegular
        });
        const images = Images.downloadAsync();
        const icons = loadIcons();
        try {
            await Promise.all([fonts, ...images, icons]);
        } catch (e) {
            // Do nothing
        }
        this.ready();
    }

    render(): React.Node {
           



        const {isReady} = this.state;
        if (!isReady) {
            return (
                <React.Fragment>
                    <StatusBar
                        translucent
                        backgroundColor="transparent"
                        barStyle="dark-content"
                    />
                    <AppLoading />
                </React.Fragment>
            );
        }
        return (


            <React.Fragment>

                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
                <ThemeProvider>
                    <PlayerProvider>
                        <AppNavigator {...{onNavigationStateChange}} />
                    </PlayerProvider>
                </ThemeProvider>
    







    

<View style={{flexDirection: "row",      backgroundColor: 'lightgrey'
  , justifyContent: 'space-evenly'
}}>

    <TouchableHighlight onPress={() => Linking.openURL("https://www.facebook.com/RutaCincoHn/")}>
      <Image
        style={styles.button}
        source={require('./facebook.png')}
      />
    </TouchableHighlight>

    <TouchableHighlight onPress={() => Linking.openURL("https://mobile.twitter.com/ruta5hn")}>
      <Image
        style={styles.button}
        source={require('./twitter.png')}
      />
    </TouchableHighlight>

     <TouchableHighlight onPress={() => Linking.openURL("https://www.instagram.com/ruta5hn/")}>
      <Image
        style={styles.button}
        source={require('./instagram.png')}
      />
    </TouchableHighlight>

     <TouchableHighlight onPress={() => Linking.openURL("https://www.linkedin.com/in/ruta5hn/")}>
      <Image
        style={styles.button}
        source={require('./link.png')}
      />
    </TouchableHighlight>

     <TouchableHighlight onPress={() => Linking.openURL("https://www.youtube.com/channel/UCk_-JJq-7Pv7W-IfqiyWnvg/featured")}>
      <Image
        style={styles.button}
        source={require('./youtube.png')}
      />
    </TouchableHighlight>      
       </View>


            </React.Fragment>
        );
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: 'lightgrey',
    width: 40,
    height: 40
  }
});


const MainNavigator = createSwitchNavigator({
    Welcome: { screen: Welcome },
    Food: { screen: FoodNavigator },
    Social: { screen: SocialNavigator },
    Music: { screen: MusicNavigator },
    Photography: { screen: PhotographyNavigator }
});
const AppNavigator = createAppContainer(MainNavigator);
