// @flow
import {TabNavigator} from "react-navigation";

import Recipes from "./Recipes";
import FoodTab from "./FoodTab";

const FoodNavigator = TabNavigator({
    Recipes: { screen: Recipes }
}, {
    animationEnabled: false,
    tabBarComponent: FoodTab,
    tabBarPosition: "bottom"
});

export {FoodNavigator};
