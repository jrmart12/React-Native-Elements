// @flow
import * as _ from "lodash";
import * as React from "react";
import {Animated, Dimensions} from "react-native";

import {Text} from "../../components";

type DegreesProps = {
    rotation: Animated.Value
};

type DegreesState = {
    degrees: number
};

export default class Degrees extends React.Component<DegreesProps, DegreesState> {

    listener: string;

    state = {
        degrees: -25
    }

    setDegrees = (value: { value: number }) => {
        this.setState({ degrees: _.round(((value.value / viewport) * 50) - 25) });
    }

    componentDidMount() {
        this.listener = this.props.rotation.addListener(this.setDegrees);
    }

    componentWillUnmount() {
        this.props.rotation.removeListener(this.listener);
    }

    render(): React.Node {
        const {degrees} = this.state;
        return (
            <Text align="center" primary>{`${degrees}°`}</Text>
        );
    }
}

const viewport = Dimensions.get("window").width;
