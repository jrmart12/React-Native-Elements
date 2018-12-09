import * as React from "react";
 import {StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";

 import {StyleGuide, Image} from "../components";

 type KitProps = {
     title: string,
     backgroundColor: string,
     onPress: () => void,
     uri: string,
     preview: string
 };

 export default class Kit extends React.PureComponent<KitProps> {

     render(): React.Node {
         const {backgroundColor, title, uri, preview, onPress} = this.props;
         return (
             <TouchableWithoutFeedback {...{onPress}}>
                 <View style={[styles.container, { backgroundColor }]}>
                     <Image style={styles.image} {...{uri, preview}} />
                     <Text style={styles.text}>{title}</Text>
                 </View>
             </TouchableWithoutFeedback>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
         ...StyleGuide.styles.borderRadius,
         ...StyleGuide.styles.shadow,
         marginTop: StyleGuide.spacing.small,
         marginHorizontal: StyleGuide.spacing.large
     },
     image: {
         height: 200,
         borderTopLeftRadius: 5,
         borderTopRightRadius: 5,
         borderBottomRightRadius: 2,
         borderBottomLeftRadius: 2
     },
     text: {
         margin: StyleGuide.spacing.large,
         color: StyleGuide.palette.black,
         ...StyleGuide.typography.title3
     }
 });