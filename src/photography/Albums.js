// @flow
import * as React from "react";
import {View} from "react-native";

import {Feed, notImplementedYet, type NavigationProps} from "../components";

export default class Albums extends React.PureComponent<NavigationProps<>> {

    render(): React.Node {
        // const {renderItem} = this;
        const {navigation} = this.props;
        const data = [];
        const rightAction = {
            icon: "camera",
            onPress: notImplementedYet
        };
        return (
            <Feed title="Albums" {...{navigation, data, rightAction, renderItem}} />
        );
    }
}

const renderItem = () => <View />;
