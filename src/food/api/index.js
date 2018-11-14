// @flow
import type {Food} from "../../components/food/Model";

const recipes = require("./recipes");
const restaurants = require("./restaurants");

const api: Food = {
    categories: recipes.categories,
    recipes: recipes.recipes,
    restaurants
};

export default api;
