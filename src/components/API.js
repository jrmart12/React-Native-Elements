// @flow
const food = require("./data/food");

export type Category = {
    id: string,
    title: string,
    subtitle: string
};

export type Food = {
    categories: { [category: string]: Category }
};

export default class API {
    static food: Food = food;
}
