// @flow
import * as React from "react";
import {StyleSheet, View, ActivityIndicator, TouchableOpacity, Dimensions} from "react-native";
import {Camera, Permissions} from "expo";

import {
    IconButton, Icon, StyleGuide, notImplementedYet, withTheme, SafeAreaView, type ThemeProps, type NavigationProps
} from "../components";

import {EnableCameraPermission} from "./components";

type PermissionStatus = 'undetermined' | 'granted' | 'denied';
type CameraProps = NavigationProps<> & ThemeProps;
type CameraState = {
  hasCameraPermission: null | boolean,
  type: number,
  flashMode: number,
  showGrid: boolean
};

class CameraScreen extends React.Component<CameraProps, CameraState> {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        showGrid: false
    };

    setCameraPermission(status: PermissionStatus) {
        this.setState({ hasCameraPermission: status === "granted" });
    }

    toggleFlash = () => {
        const {flashMode} = this.state;
        const {on, off} = Camera.Constants.FlashMode;
        this.setState({ flashMode: flashMode === on ? off : on });
    }

    toggleGrid = () => {
        this.setState({ showGrid: !this.state.showGrid });
    }

    toggleCamera = () => {
        const {type} = this.state;
        const {front, back} = Camera.Constants.Type;
        this.setState({ type: type === back ? front : back });
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    async componentDidMount(): Promise<void> {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setCameraPermission(status);
    }

    render(): React.Node {
        const {toggleFlash, toggleCamera, goBack, toggleGrid} = this;
        const {hasCameraPermission, type, flashMode, showGrid} = this.state;
        const {theme} = this.props;
        if (hasCameraPermission === null) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator />
                </View>
            );
        } else if (hasCameraPermission === false) {
            return <EnableCameraPermission />;
        }
        return (
            <Camera style={styles.camera} {...{type, flashMode}}>
                <SafeAreaView style={styles.cameraSafeArea} top>
                    <View style={styles.header}>
                        <IconButton name="grid" onPress={toggleGrid} />
                        <IconButton
                            name="flash"
                            onPress={toggleFlash}
                            color={flashMode === Camera.Constants.FlashMode.on ? "white" : "rgba(255, 255, 255, 0.5)"}
                        />
                    </View>
                    {
                        showGrid && (
                            <View style={styles.grid}>
                                <View style={styles.row}>
                                    <View style={styles.cell} />
                                    <View style={styles.cell} />
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.cell} />
                                    <View style={styles.cell} />
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.cell} />
                                    <View style={styles.cell} />
                                </View>
                            </View>
                        )
                    }
                    <View style={styles.footer}>
                        <IconButton name="cross" onPress={goBack} />
                        <TouchableOpacity onPress={notImplementedYet}>
                            <View style={styles.snapButton}>
                                <View style={[styles.innerSnapButton, { backgroundColor: theme.palette.primary }]}>
                                    <Icon color="white" name="camera" />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <IconButton name="reverse" onPress={toggleCamera} />
                    </View>
                </SafeAreaView>
            </Camera>
        );
    }
}

const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    camera: {
        flex: 1
    },
    cameraSafeArea: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: StyleGuide.palette.transparent
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: StyleGuide.spacing.small
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: StyleGuide.spacing.small
    },
    snapButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 4,
        borderColor: StyleGuide.palette.white,
        justifyContent: "center",
        alignItems: "center"
    },
    innerSnapButton: {
        width: 52,
        height: 52,
        borderRadius: 25.5,
        justifyContent: "center",
        alignItems: "center"
    },
    grid: {
        borderColor: StyleGuide.palette.darkGray,
        borderWidth: 1,
        marginLeft: StyleGuide.spacing.small,
        width: width - (StyleGuide.spacing.small * 2),
        height: width - (StyleGuide.spacing.small * 2)
    },
    row: {
        height: (width - (StyleGuide.spacing.small * 2)) / 3,
        borderColor: StyleGuide.palette.darkGray,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    cell: {
        width: (width - (StyleGuide.spacing.small * 2)) / 3,
        height: (width - (StyleGuide.spacing.small * 2)) / 3,
        borderColor: StyleGuide.palette.darkGray,
        borderRightWidth: 1
    }
});

export default withTheme(CameraScreen);
