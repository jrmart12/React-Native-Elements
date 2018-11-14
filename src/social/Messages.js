// @flow
import * as _ from "lodash";
import * as React from "react";

import {Feed} from "../components";

import SocialAPI from "./api";
import {Message} from "../components/social";

import type {NavigationProps} from "../components";
import type {MessageThread} from "../components/social/Model";

export default class Messages extends React.Component<NavigationProps<>> {

    renderItem = (thread: MessageThread): React.Node => {
        const {navigation} = this.props;
        const {id} = thread;
        const user = SocialAPI.user(thread.user);
        const {timestamp, message} = _.last(thread.messages);
        return <Message {...{ user, message, timestamp, id, navigation}} />;
    }

    render(): React.Node {
        const {renderItem} = this;
        const {navigation} = this.props;
        const data = SocialAPI.messages;
        const title = "Messages";
        return (
            <Feed {...{data, renderItem, title, navigation}} />
        );
    }
}
