// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar, DetailsBar, Content, List, Button, ActionSheet, StyleGuide, notImplementedYet
} from "../components";

import FoodAPI from "./api";
import {Ingredient, Step} from "../components/food";

import type {NavigationProps} from "../components/";

export default class RecipeComp extends React.Component<NavigationProps<{ categoryId: string, recipeId: string }>> {

    // TODO: use createRef()
    ingredientList: ActionSheet;

    render(): React.Node {
        const {navigation} = this.props;
        const {categoryId, recipeId} = navigation.state.params;
        const category = FoodAPI.categories.filter(cat => categoryId === cat.id)[0];
        const recipe = FoodAPI.recipes[category.id].filter(r => r.id === recipeId)[0];
        const people = `${recipe.people} ${recipe.people > 1 ? "people" : "person"}`;
        const minutes = `${recipe.minutes} minutes`;
        return (
            <Container>
                <Header title={recipe.title} picture={recipe.picture}>
                    <NavigationBar type="transparent" back={category.title} {...{navigation}} />
                </Header>
                <DetailsBar details={[{ icon: "restaurant", caption: people }, { icon: "time", caption: minutes }]} />
                <Content style={styles.gutter}>
                    <Button primary label="See Ingredients" onPress={this.toggleIngredientList} />
                    <List rows={recipe.instructions} renderRow={(step, i) => <Step index={i + 1} {...{step}} />} />
                </Content>
                <ActionSheet title="Ingredients" ref={this.setIngredientListRef} scrollable>
                    {
                        recipe.ingredients.map((ingredient, key) => <Ingredient {...{ingredient, key}} />)
                    }
                    <View style={styles.gutter}>
                        <Button primary label="Add to Reminder" onPress={notImplementedYet} />
                    </View>
                </ActionSheet>
            </Container>
        );
    }

    toggleIngredientList = () => {
        this.ingredientList.toggle();
    }

    setIngredientListRef = (ingredientList: ?ActionSheet) => {
        if (ingredientList) {
            this.ingredientList = ingredientList;
        }
    }
}

const styles = StyleSheet.create({
    gutter: {
        padding: StyleGuide.spacing.small
    }
});
