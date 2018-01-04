// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {Feed} from "../components";

import SocialAPI from "./api";
import {Post, Stories} from "./components";

import type {Post as PostModel} from "./api";
import type {NavigationProps} from "../components";

export default class Timeline extends React.Component<NavigationProps<>> {

    @autobind
    renderItem(post: PostModel): React.Node {
        return <Post {...{post}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = SocialAPI.posts;
        const title = "Timeline";
        return (
            <Feed header={<Stories {...{navigation}} />} {...{data, renderItem, title, navigation}} />
        );
    }
}
