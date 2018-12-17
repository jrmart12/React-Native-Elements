import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar,  Image,Text, StyleGuide, SegmentedControl, Content, App
} from "../components";

import SocialAPI from "./api";
import {Post} from "../components/social";

import type {NavigationProps} from "../components";

const {users} = SocialAPI;

type ProfileState = {
    selectedIndex: number
};

export default class Profile extends React.Component<NavigationProps<>, ProfileState> {

    state = {
        selectedIndex: 0
    };

    onChange = (selectedIndex) => this.setState({ selectedIndex });

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    data = (params) => {

            return (
                <Text color="black" type="callout" style={styles.body}>Ruta5 se creó en el año 2014 con el propósito de exaltar el rol de 
los hondureños exitosos dentro o fuera de Honduras, a través de artículos que se publican semanalmente en nuestro sitio web http://www.rutacincohn.com. 
Abordamos también temas de turismo, gastronomía catracha, cultura, empresas de éxito, extranjeros en Honduras, centroamericanos exitosos y otros temas de 
interés mundial. Nuestra misión es promover el desarrollo y el crecimiento económico, conectar a  los hondureños en el mundo, promocionar su empresa y posicionar las noticias 
positivas de Honduras ante el ojo crítico mundial.
                </Text>
            );
              
    }
    render(): React.Node {
        const {onPress, onChange} = this;
        const {navigation} = this.props;
        const {selectedIndex} = this.state;
        const me = SocialAPI.me();
        return (
            <Container>
                <Header picture={me.cover} heightRatio={0.6}>
                    <NavigationBar type="transparent" rightAction={{ icon: "sign-out", onPress }} {...{navigation}} />
                    <View style={styles.container}>
                        <Text color="white" type="title1" style={styles.text}>Biografia</Text>
                    </View>
                </Header>
                <Content style={styles.content}>
                    {
                        this.data(selectedIndex)
                    }
                </Content>
            </Container>
        );
    }


}



const styles = StyleSheet.create({
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        marginBottom: StyleGuide.spacing.tiny,
        marginTop: "10%"
    },
    body: {
        fontSize: 18,
        textAlign: "justify",
        marginRight: "3%",
        marginLeft: "3%",
        marginTop: "3%",
        lineHeight: 30,
        marginBottom: StyleGuide.spacing.tiny
    },
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});