// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {StyleGuide, Image, Text} from "../../components";

import SocialAPI from "../api";

import Header from "./Header";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

import type {Post} from "../api";

export default class PostComp extends React.Component<{ post: Post }> {

    render(): React.Node {
        const {post} = this.props;
        const user = SocialAPI.user(post.user);
        const {timestamp, comments} = post;
        return (
            <View style={styles.post}>
                <Header {...{user, timestamp}} />
                {
                    post.picture && <Image style={styles.image} {...post.picture} />
                }
                <Text style={styles.caption}>{post.caption}</Text>
                <View style={styles.footer}>
                    <Comments {...{ comments }} />
                    <LikeButton />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    post: {
        ...StyleGuide.styles.borderRadius,
        ...StyleGuide.styles.shadow,
        marginTop: StyleGuide.spacing.small,
        marginHorizontal: StyleGuide.spacing.small,
        backgroundColor: "white"
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
