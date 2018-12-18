// @flow
import * as React from "react";
import {ScrollView, StyleSheet, View, Image, StatusBar,TouchableOpacity, Button, Platform , Share} from "react-native";
import axios from "axios";
import {ThemeProvider, Colors, StyleGuide, Images, Text, SafeAreaView} from "../components";

import Kit from "./Kit";

import type {ThemeName} from "../components/theme";
import type {NavigationProps} from "../components/Navigation";

const images = require("./images");

export default class Welcome extends React.Component<NavigationProps<>> {

    navigate(themeName: ThemeName) {
        const { navigation } = this.props;
        const themeProvider = ThemeProvider.getInstance();
        themeProvider.switchColors(Colors[themeName]);
        navigation.navigate(themeName);
    }
    
    food = () => this.navigate("Food");
    photography = () => this.navigate("Photography");
    social = () => this.navigate("Social");
     travel = () => this.navigate("Travel");

    state = {
        postsData: []
    };

    async componentDidMount(): Promise<void> {
        let info = [];
        axios
            .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/?fields=ID,title,date,modified,author,URL,content,featured_image&number=50")
            .then(res => {
                const post = res.data.posts;
                for (let index = 0; index < post.length; index++) {
                    info.push(post[index]);
                }

                this.setState(() => ({
                    postsData: info
                }));
            })
            .catch(err => console.log(err.message)); //eslint-disable-lint
    }

    render(): React.Node {

        return (
            <React.Fragment>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeHeader} top>
                        <View style={styles.header}>
                            <View>
                                <Text type="title1">RutaCincoHN</Text>
                                <Text type="title3">El Blog de los Hondureños en el Extranjero</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                    <ScrollView contentContainerStyle={styles.content}>
                        <SafeAreaView>
                            <Kit
                                uri={images.food.uri}
                                preview={images.food.preview}
                                title="Entrevistas"
                                backgroundColor={Colors.Food.primary}
                                onPress={this.food}
                            />                            
                            <Kit
                                uri={images.photography.uri}
                                preview={images.photography.preview}
                                title="Fotos"
                                backgroundColor={Colors.Photography.primary}
                                onPress={this.photography}
                            />
                            <Kit

                                 uri={images.social.uri}
                                 preview={images.social.preview}
                                 title="Bio"
                                 backgroundColor={Colors.Social.primary}
                                 onPress={this.social}
                             />
                        </SafeAreaView>
                    </ScrollView>
                    
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeHeader: {
        ...StyleGuide.styles.shadow
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.small
    },
    content: {
        paddingVertical: StyleGuide.spacing.large
    }
});
