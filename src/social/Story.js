// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, SafeAreaView, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo";

import {Image, StyleGuide, IconButton, ActionSheet, Content} from "../components";

import SocialAPI from "./api";
import {Comments, Handle, Message} from "./components";

import type {NavigationProps} from "../components";

export default class Story extends React.Component<NavigationProps<{ id: string }>> {

    comments: ActionSheet;

    @autobind
    goBack() {
        this.props.navigation.goBack();
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {id} = navigation.state.params;
        const story = SocialAPI.story(id);
        const user = SocialAPI.user(story.user);
        return (
            <View style={styles.story}>
                <Image  {...story.picture} style={styles.image} />
                <View style={styles.content}>
                    <LinearGradient colors={["black", "transparent"]} style={styles.gradient}>
                        <SafeAreaView style={styles.top}>
                            <View style={styles.topLeft}>
                                <IconButton name="x" onPress={this.goBack} style={styles.goBack} />
                                <Handle {...{user}} handleColor="white" />
                            </View>
                            <TouchableOpacity onPress={this.toggleComments}>
                                <Comments comments={story.comments.map(comment => comment.user)} showLabel={false} />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </LinearGradient>
                    <SafeAreaView style={styles.bottom}>
                        <IconButton name="edit" onPress={() => alert("🤷🏻‍♂️")} />
                    </SafeAreaView>
                    <ActionSheet title="Comments" ref={this.setCommentsRef}>
                        <Content style={styles.comments}>
                        {
                            story.comments.map((msg, key) => (
                                <Message user={msg.user} timestamp={msg.timestamp} message={msg.comment} {...{key}} />
                            ))
                        }
                        </Content>
                    </ActionSheet>
                </View>
            </View>
        );
    }

    @autobind
    setCommentsRef(comments: ActionSheet | null) {
        if (comments) {
            this.comments = comments;
        }
    }

    @autobind
    toggleComments() {
        this.comments.toggle();
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
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: StyleGuide.spacing.tiny
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
        marginHorizontal: StyleGuide.spacing.tiny
    },
    comments: {
        paddingBottom: 40
    }
});
