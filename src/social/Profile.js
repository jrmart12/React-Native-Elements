// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react/native";
import {StyleSheet, View} from "react-native";

import {
    NavigationHelpers, Container, Header, NavigationBar, Text, StyleGuide, SegmentedControl, Content, Avatar
} from "../components";

import SocialAPI from "./api";
import {Post} from "./components";

import type {NavigationProps} from "../components";

@observer
export default class Profile extends React.Component<NavigationProps<>> {

    @observable selectedIndex = 0;

    @autobind @action
    onChange(index: number) {
        this.selectedIndex = index;
    }

    @autobind
    onPress() {
        const {navigation} = this.props;
        NavigationHelpers.logout(navigation);
    }

    render(): React.Node {
        const {onPress, selectedIndex, onChange} = this;
        const {navigation} = this.props;
        const {myPosts} = SocialAPI;
        const me = SocialAPI.me();
        return (
            <Container>
                <Header picture={me.cover} heightRatio={1}>
                    <NavigationBar type="transparent" rightAction={{ icon: "log-out", onPress }} {...{navigation}} />
                        <View style={styles.container}>
                            <Avatar uri={me.picture} size={90} style={styles.avatar} />
                            <Text color="white" type="title3" style={styles.text}>{me.name}</Text>
                            <Text color="white" type="callout" style={styles.text}>{me.caption}</Text>
                            <SegmentedControl
                                transparent={true}
                                values={["Posts", "Comments", "Likes"]}
                                {...{selectedIndex, onChange}}
                            />
                        </View>
                </Header>
                <Content style={styles.content}>
                {
                    myPosts.map((post, key) => <Post {...{post, key}} />)
                }
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1
    },
    container: {
        marginHorizontal: StyleGuide.spacing.small,
        flex: 1,
        justifyContent: "center"
    },
    logOut: {
        position: "absolute",
        top: StyleGuide.spacing.tiny,
        left: StyleGuide.spacing.small
    },
    avatar: {
        borderRadius: 45,
        borderWidth: 3,
        borderColor: "white",
        marginVertical: StyleGuide.spacing.tiny
    },
    text: {
        textAlign: "center",
        marginBottom: StyleGuide.spacing.tiny
    },
    content: {
        paddingBottom: StyleGuide.spacing.small
    }
})
