// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo";

import {Image, StyleGuide, IconButton, ActionSheet, Content, notImplementedYet} from "../components";

import SocialAPI from "./api";
import {Comments, Handle, Message, NewMessage} from "./components";

import type {NavigationProps} from "../components";

export default class Story extends React.Component<NavigationProps<{ id: string }>> {

    comments: ActionSheet;
    newPost: ActionSheet;

    @autobind
    goBack() {
        this.props.navigation.goBack();
    }

    @autobind
    toggleNewMessage() {
        this.newPost.toggle();
    }

    @autobind
    newPostRef(newPost: ActionSheet | null) {
        if (newPost) {
            this.newPost = newPost;
        }
    }

    @autobind
    commentsRef(comments: ActionSheet | null) {
        if (comments) {
            this.comments = comments;
        }
    }

    @autobind
    toggleComments() {
        this.comments.toggle();
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const story = SocialAPI.story(id);
        const user = SocialAPI.user(story.user);
        const postAction = {
            label: "Post",
            onPress: notImplementedYet
        };
        return (
            <View style={styles.story}>
                <Image style={styles.image} {...story.picture} />
                <View style={styles.content}>
                    <LinearGradient colors={["black", "transparent"]} style={styles.gradient}>
                        <SafeAreaView>
                            <View style={styles.top}>
                                <View style={styles.topLeft}>
                                    <IconButton name="x" onPress={this.goBack} style={styles.goBack} />
                                    <Handle {...{user}} handleColor="white" />
                                </View>
                                <TouchableOpacity onPress={this.toggleComments}>
                                    <Comments
                                        comments={story.comments.map(comment => comment.user)}
                                        showLabel={false}
                                    />
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                    <SafeAreaView style={styles.bottom}>
                        <IconButton name="edit" onPress={this.toggleNewMessage} />
                    </SafeAreaView>
                    <ActionSheet title="Comments" ref={this.commentsRef}>
                        <Content style={styles.comments}>
                            {
                                story.comments.map((msg, key) => (
                                    <Message
                                        user={msg.user}
                                        timestamp={msg.timestamp}
                                        message={msg.comment}
                                        {...{key}}
                                    />
                                ))
                            }
                        </Content>
                    </ActionSheet>
                    <ActionSheet title="New Post" ref={this.newPostRef} rightAction={postAction}>
                        <NewMessage />
                    </ActionSheet>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    story: {
        flex: 1
    },
    image: {
        ...StyleSheet.absoluteFillObject
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "space-between"
    },
    gradient: {
        height: 200
    },
    top: {
        marginTop: StyleGuide.spacing.tiny,
        marginHorizontal: StyleGuide.spacing.tiny,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    topLeft: {
        flexDirection: "row"
    },
    goBack: {
        marginRight: StyleGuide.spacing.tiny
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: StyleGuide.spacing.tiny,
        marginHorizontal: StyleGuide.spacing.tiny
    },
    comments: {
        paddingBottom: 40
    }
});
