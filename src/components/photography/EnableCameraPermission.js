// @flow
import * as React from "react";
import {StyleSheet, View, ActivityIndicator, Linking} from "react-native";

import {Text, Button, StyleGuide} from "../../components";

type EnableCameraPermissionState = {
  canOpen: boolean | null
};

export default class EnableCameraPermission extends React.Component<{}, EnableCameraPermissionState> {

    state = {
        canOpen: null
    };

    async componentDidMount(): Promise<void> {
        const canOpen = await Linking.canOpenURL("app-settings:");
        this.setState({ canOpen });
    }

    render(): React.Node {
        const {canOpen} = this.state;
        if (canOpen === null) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text type="title1">Take Pictures with React Native Elements</Text>
                <Text>
                Allow access to your camera to start taking photos with React Native Elements.
                </Text>
                {
                    canOpen === true && (
                        <Button label="Enable Camera Access" primary {...{onPress}} />
                    )
                }
                {
                    canOpen === false && (
                        <Text>
                        Allow access to your camera in the app settings.
                        </Text>
                    )
                }
            </View>
        );
    }
}

const onPress = async (): Promise<void> => Linking.openURL("app-settings:");

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: StyleGuide.spacing.small
    }
});
