// @f
import * as React from "react";

import {Card, Feed,NavigationBar} from "../components";

import FoodAPI from "./api";
import type {Category} from "../components/food/Model";

import {F, type NavigationProps} from "../components";
import axios from "axios";
import Post from "./post";

 const images = require("./../welcome/images");
import {ScrollView, StyleSheet, View, Image, StatusBar, TouchableHighlight, Linking} from "react-native";
 import {ThemeProvider, Colors, StyleGuide, Images, Text, SafeAreaView} from "../components";
export default class Recipes extends React.Component<NavigationProps<>> {

    renderItem = (category: Category): React.Node => {
        const {navigation} = this.props;
        return <Card {...category} onPress={() => navigation.navigate("Category", { categoryId: category.id })} />;
    }



    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }
        state = {
            postsData: []
        };

     async componentDidMount(): Promise<void> {
         let info = [];
         axios
             .get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/")
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
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
         return (
             <React.Fragment>
                 <View style={styles.container}>
                 
                     <SafeAreaView style={styles.safeHeader}  top>
                     <NavigationBar type="transparent" rightAction={{ icon: "sign-out", onPress }} />
                         <View style={styles.header}>
                             <View >
                                 <Text color="white" type="title1">Entrevistas</Text>
                             </View>
                         </View>
                     </SafeAreaView>
                     <ScrollView contentContainerStyle={styles.content}>
                         <SafeAreaView>
                             {this.state.postsData.map(data => (
                                 <Post
                                     key={data.ID.toString()}
                                     uri={data.featured_image}
                                     preview={images.food.preview}
                                     title={`${data.title}`}
                                     backgroundColor={Colors.Food.primary}
                                     onPress={this.food}
                                 />
                             ))}
                         </SafeAreaView>
                     </ScrollView>
                 </View>
             </React.Fragment>
             );
     }


}

const styles = StyleSheet.create({

     safeHeader: {
         ...StyleGuide.styles.shadow,
             backgroundColor: Colors.Food.primary

     },
     header: {
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         padding: StyleGuide.spacing.small
     },
     content: {
         paddingVertical: StyleGuide.spacing.large
     },

     button: {
             backgroundColor: Colors.Food.primary,
    width: 40,
    height: 40,
    top: 100
  }
 });
