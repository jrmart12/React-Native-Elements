// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar, Text, BaseCard, Button, Content, StyleGuide, notImplementedYet,
    type NavigationProps
} from "../components";

import type {City} from "../components/travel/Model";

export default class CityScreen extends React.PureComponent<NavigationProps<{ city: City }>> {

    goToRestaurant = () => {
        const {navigation} = this.props;
        const {city} = navigation.state.params;
        navigation.navigate("Restaurants", { city });
    }

    goToHotels = () => {
        const {navigation} = this.props;
        const {city} = navigation.state.params;
        navigation.navigate("Hotels", { city });
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {city} = navigation.state.params;
        const rightAction = {
            icon: "bookmark",
            onPress: notImplementedYet
        };
        return (
            <Container>
                <Header title={city.city} picture={city.picture}>
                    <NavigationBar type="transparent" back="Cities" {...{navigation, rightAction}} />
                </Header>
                <Content>
                    <View style={styles.buttons}>
                        <View style={styles.leftButton}>
                            <Button icon="restaurant" onPress={this.goToRestaurant} primary />
                        </View>
                        <View style={styles.RightButton}>
                            <Button icon="hotel" onPress={this.goToHotels} primary />
                        </View>
                    </View>
                    <BaseCard>
                        <Text>{city.description}</Text>
                    </BaseCard>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        paddingTop: StyleGuide.spacing.small,
        paddingHorizontal: StyleGuide.spacing.small
    },
    leftButton: {
        flex: 1,
        marginRight: StyleGuide.spacing.tiny
    },
    RightButton: {
        flex: 1
    }
});
