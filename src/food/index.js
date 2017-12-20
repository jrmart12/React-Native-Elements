// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import PropTypes from "prop-types";
import {TabNavigator} from "react-navigation";

import Recipes from "./Recipes";
import FoodTab from "./FoodTab";

const Food = TabNavigator({
    Recipes: { screen: Recipes }
}, {
    animationEnabled: false,
    tabBarComponent: FoodTab,
    tabBarPosition: "bottom"
});

export class FoodNavigator extends React.Component<{}> {

    static childContextTypes = {
        color: PropTypes.string
    };

    getChildContext(): { color: string } {
      return {
          color: "#73C700"
      };
    }

    @autobind
    onNavigationStateChange() {
        return undefined;
    }

    render(): React.Node {
        const {onNavigationStateChange} = this;
        return <Food {...{onNavigationStateChange}} />;
    }
}
