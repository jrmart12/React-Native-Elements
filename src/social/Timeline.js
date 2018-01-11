// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet} from "react-native";

import {Feed, ActionSheet, notImplementedYet} from "../components";

import SocialAPI from "./api";
import {Post, Stories, NewMessage} from "./components";

import type {Post as PostModel} from "./api";
import type {NavigationProps} from "../components";

export default class Timeline extends React.Component<NavigationProps<>> {

    newPost: ActionSheet;

    @autobind
    renderItem(post: PostModel): React.Node {
        return <Post {...{post}} />;
    }

    @autobind
    onPress() {
        this.newPost.toggle();
    }

    @autobind
    setNewPostRef(newPost: ActionSheet | null) {
        if (newPost) {
            this.newPost = newPost;
        }
    }

    render(): React.Node {
        const {renderItem, onPress} = this;
        const {navigation} = this.props;
        const data = SocialAPI.posts;
        const title = "Timeline";
        const rightAction = {
            icon: "edit",
            onPress
        };
        const postAction = {
            label: "Post",
            onPress: notImplementedYet
        };
        return (
            <View style={styles.container}>
                <Feed
                    header={<Stories {...{navigation}} />}
                    {...{data, renderItem, title, navigation, rightAction}}
                />
                <ActionSheet title="New Post" ref={this.setNewPostRef} rightAction={postAction}>
                    <NewMessage />
                </ActionSheet>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
