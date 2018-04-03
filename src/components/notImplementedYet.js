// @flow
import {Alert, Platform} from "react-native";

export const notImplementedYet = () => Platform.OS === "android" && Alert.alert("Not Implemented 🤷🏻‍♂️");
