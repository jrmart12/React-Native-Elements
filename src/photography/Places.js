// @flow
import * as React from "react";

import {NavigationBar, Container, notImplementedYet, type NavigationProps} from "../components";

import PhotoAPI from "./api";
import {PhotoMap} from "./components";

export default class Places extends React.PureComponent<NavigationProps<>> {

    render(): React.Node {
        const {navigation} = this.props;
        const {photos} = PhotoAPI;
        const rightAction = {
            icon: "camera",
            onPress: notImplementedYet
        };
        return (
            <Container>
                <NavigationBar title="Places" expanded {...{rightAction, navigation}} />
                <Container>
                    <PhotoMap {...{navigation, photos}} />
                </Container>
            </Container>
        );
    }
}
