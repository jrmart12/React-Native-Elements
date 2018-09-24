// @flow
import * as React from "react";

import {IconButton} from "../../components";
import {withTheme} from "../../components/theme";

import type {ThemeProps} from "../../components/theme";

type LikeButtonState = {
    liked: boolean
};

class LikeButton extends React.Component<ThemeProps, LikeButtonState> {

    state = {
        liked: false
    };

    onPress = () => this.setState({ liked: !this.state.liked });

    render(): React.Node {
        const {onPress} = this;
        const {theme} = this.props;
        const {liked} = this.state;
        return (
            <IconButton name="heart" color={liked ? theme.palette.primary : theme.palette.darkGray} {...{onPress}} />
        );
    }
}

export default withTheme(LikeButton);
