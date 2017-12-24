// @flow
const food = require("./data/food");

export type Picture = {
    uri: string,
    preview: string
};

export type Category = {
    id: string,
    title: string,
    subtitle: string,
    picture: Picture
};

export type Food = {
    categories: Category[]
};

export default class API {
    static food: Food = food;
}
