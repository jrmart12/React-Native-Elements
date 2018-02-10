// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet} from "react-native";
import {MapView} from "expo";

const mapStyle = require("../../components/mapStyle");

export default class PhotoMap extends React.Component<{}> {

    map: MapView;


    @autobind
    setMapRef(map: MapView | null) {
        this.map = map;
    }

    componentDidMount() {
        // eslint-disable-next-line no-undef
        requestAnimationFrame(() => {
            this.map.animateToRegion({
                latitude: 47.377343,
                longitude: 8.535342,
                latitudeDelta: 0.0022,
                longitudeDelta: 0.0022
            }, 1);
        });
    }

    render(): React.Node {
        return (
            <MapView
                style={styles.map}
                ref={this.setMapRef}
                provider="google"
                customMapStyle={mapStyle}
            />
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
