// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar, DetailsBar, Content, Text, BaseCard, Button, ActionSheet, StyleGuide, Map,
    Ratings, QuantityInput, PayButton, DatePicker
} from "../components";

import {RestaurantAddress, RadioGroup} from "./components";

import type {ScreenParams} from "../components/Navigation";
import type {Restaurant} from "./api";

export default class RestaurantComp extends React.Component<ScreenParams<{ restaurant: Restaurant }>> {

    reservation: ActionSheet;

    render(): React.Node {
        const {navigation} = this.props
        const {restaurant} = navigation.state.params;
        const {ratings, title, picture, coordinate, description} = restaurant;
        const details = [
            {
                comp: <Ratings name="dollar" ratings={restaurant.price.expensive} total={4} />,
                caption: `CHF${restaurant.price.from} - ${restaurant.price.to}`
            },
            {
                comp: <Ratings {...{ratings}} />,
                caption: `${restaurant.reviews} reviews`
            },
            {
                icon: "clock",
                caption: `${restaurant.openings.from} - ${restaurant.openings.to}`
            }
        ];
        return (
            <Container>
                <Header {...{title, picture}}>
                    <NavigationBar type="transparent" back="Restaurants" {...{navigation}} />
                </Header>
                <DetailsBar {...{details}} />
                <Content>
                    <Map markers={[restaurant]} {...{coordinate}} />
                    <View style={styles.description}>
                        <Button primary={true} label="Make reservation" onPress={this.makeReservation} />
                        <BaseCard>
                            <Text>{description}</Text>
                        </BaseCard>
                    </View>
                </Content>
                <ActionSheet title="Reservation" ref={this.setReservationRef}>
                    <RestaurantAddress {...{restaurant}} />
                    <View style={styles.gutter}>
                        <DatePicker />
                        <QuantityInput singular="person" plural="people" from={1} to={6} />
                        <RadioGroup options={["19:00", "19:30", "20:00", "20:30"]} />
                        <PayButton />
                    </View>
                </ActionSheet>
            </Container>
        );
    }

    @autobind
    makeReservation() {
        this.reservation.toggle();
    }

    @autobind
    setReservationRef(reservation: ActionSheet | null) {
        if(reservation) {
            this.reservation = reservation;
        }
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small
    },
    description: {
        position: "relative",
        top: -100,
        padding: StyleGuide.spacing.small
    }
});
