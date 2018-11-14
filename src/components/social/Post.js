// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {StyleGuide, Image, Text, BaseCard} from "../../components";
import type {User, Post} from "./Model";

import Header from "./Header";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

export default class PostComp extends React.PureComponent<{ user: User, post: Post, users: User[] }> {

    render(): React.Node {
        const {post, user, users: allUsers} = this.props;
        const {timestamp, comments} = post;
        const users = allUsers.filter(u => comments.find(comment => comment === u.id));
        return (
            <BaseCard style={styles.card}>
                <Header {...{user, timestamp}} />
                {
                    post.picture && <Image style={styles.image} {...post.picture} />
                }
                <Text style={styles.caption}>{post.caption}</Text>
                <View style={styles.footer}>
                    <Comments {...{ comments, users }} />
                    <LikeButton />
                </View>
            </BaseCard>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        padding: 0
    },
    caption: {
        padding: StyleGuide.spacing.tiny
    },
    image: {
        height: 200
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: StyleGuide.spacing.tiny
    }
});
