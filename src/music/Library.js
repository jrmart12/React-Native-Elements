// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Feed, NavigationHelpers} from "../components";

import MusicAPI from "./api";
import {Album} from "./components";

import type {NavigationProps} from "../components";
import type {Album as AlbumModel} from "./api";

export default class Library extends React.Component<NavigationProps<>> {

        @autobind
        renderItem(album: AlbumModel): React.Node {
            const {navigation} = this.props;
            return <Album {...{album, navigation}} />;
        }

        @autobind
        onPress() {
            const {navigation} = this.props;
            NavigationHelpers.logout(navigation);
        }

        render(): React.Node {
            const {renderItem, onPress} = this;
            const {navigation} = this.props;
            const data = MusicAPI.albums;
            const title = "Library";
            const rightAction = {
                icon: "log-out",
                onPress
            }
            return (
                <Feed {...{data, renderItem, title, navigation, rightAction}} numColumns={2} />
            );
        }
}
