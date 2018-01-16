// @flow
import * as React from "react";
import {View, Text} from "react-native";
import {observer} from "mobx-react/native";

import {withTheme, type ThemeProps} from "../../components/theme";

import {withPlayer, type PlayerProps} from "./Player";

type PlayerControlsProps = PlayerProps & ThemeProps;

@observer
class PlayerControls extends React.Component<PlayerControlsProps> {

    render(): React.Node {
        const {player} = this.props;
        return (
            <View>
                <Text>{player.seconds}</Text>
            </View>
        );
    }
}

export default withPlayer(withTheme(PlayerControls));
