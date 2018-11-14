// @flow

import * as React from "react";
import {View, StyleSheet} from "react-native";

import {Feed, ActionSheet, notImplementedYet} from "../components";

import SocialAPI from "./api";
import {Post, Stories, NewMessage} from "../components/social";
import type {Post as PostModel, User} from "../components/social/Model";
import type {NavigationProps} from "../components";

const {users} = SocialAPI;
const renderItem = ({post, user}: { post: PostModel, user: User }): React.Node =>
    (<Post {...{post, user, users}} />);

export default class Timeline extends React.Component<NavigationProps<>> {

    onPress = () => this.newPost.toggle();

    // TODO: createRef()
    newPost: ActionSheet;

    newPostRef = (newPost: ActionSheet | null) => {
        if (newPost) {
            this.newPost = newPost;
        }
    }

    render(): React.Node {
        const {onPress} = this;
        const {navigation} = this.props;
        const data = SocialAPI.posts.map(post => ({ id: post.id, post, user: SocialAPI.user(post.user) }));
        const {stories} = SocialAPI;
        const title = "Timeline";
        const rightAction = {
            icon: "write",
            onPress
        };
        const postAction = {
            label: "Post",
            onPress: notImplementedYet
        };
        return (
            <View style={styles.container}>
                <Feed
                    header={<Stories {...{navigation, stories, users}} />}
                    {...{data, renderItem, title, navigation, rightAction}}
                />
                <ActionSheet title="New Post" ref={this.newPostRef} rightAction={postAction}>
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
