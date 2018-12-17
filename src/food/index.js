// @flow
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {StackNavigatorOptions, TabNavigatorOptions} from "../components/Navigation";

import Recipes from "./Recipes";
import Category from "./Category";
import Recipe from "./Recipe";
import Restaurants from "./Restaurants";
import Restaurant from "./Restaurant";

const tabs = [
    { key: "Recipes", label: "Recipes", icon: "feed" },
];

const RecipesNavigator = createStackNavigator({
    Recipes: { screen: Recipes },
    Category: { screen: Category },
    Recipe: { screen: Recipe }
}, StackNavigatorOptions);

const RestaurantsNavigator = createStackNavigator({
    Restaurants: { screen: Restaurants },
    Restaurant: { screen: Restaurant }
}, StackNavigatorOptions);

export const FoodNavigator = createBottomTabNavigator({
    Recipes: { screen: RecipesNavigator },
    Restaurants: { screen: RestaurantsNavigator }
}, TabNavigatorOptions(tabs));
