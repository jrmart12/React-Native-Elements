// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar, Text, StyleGuide, SegmentedControl, Content, Avatar
} from "../components";

import SocialAPI from "./api";
import {Post} from "../components/social";

import type {NavigationProps} from "../components";

const {users} = SocialAPI;

type ProfileState = {
    selectedIndex: number
};

export default class Profile extends React.Component<NavigationProps<>, ProfileState> {

    state = {
        selectedIndex: 0
    };

    onChange = (selectedIndex: number) => this.setState({ selectedIndex });

    onPress = () => {
        const {navigation} = this.props;
        navigation.navigate("Welcome");
    }

    render(): React.Node {
        const {onPress, onChange} = this;
        const {navigation} = this.props;
        const {selectedIndex} = this.state;
        const {myPosts} = SocialAPI;
        const me = SocialAPI.me();
        return (
            <Container>
                <Header picture={me.cover} heightRatio={1}>
                    <NavigationBar type="transparent" rightAction={{ icon: "sign-out", onPress }} {...{navigation}} />
                    <View style={styles.container}>
                        <Avatar uri={me.picture} size={90} style={styles.avatar} />
                        <Text color="white" type="title3" style={styles.text}>{me.name}</Text>
                        <Text color="white" type="callout" style={styles.text}>{me.caption}</Text>
                        <SegmentedControl
                            transparent
                            values={["Posts", "Comments", "Likes"]}
                            {...{selectedIndex, onChange}}
                        />
                    </View>
                </Header>
                <Content style={styles.content}>
                    {
                        myPosts.map((post, key) => (
                            <Post {...{post, key, user: SocialAPI.user(post.user), users}} />))
                    }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
    },
    avatar: {
        borderRadius: 45,
        borderWidth: 3,
        borderColor: StyleGuide.palette.white,
        marginVertical: StyleGuide.spacing.tiny
    },
    text: {
        textAlign: "center",
        marginBottom: StyleGuide.spacing.tiny
    },
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
});
