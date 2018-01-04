// @flow
import {Asset} from "expo";

export default class Images {

    static logo = require("../../../app.png");

    static downloadAsync(): Promise<*>[] {
        return [
            Asset.loadAsync(Images.logo)
        ];
    }
}
