// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, ScrollView, View, TouchableOpacity} from "react-native";

import {StyleGuide, Avatar} from "../../../components";

import SocialAPI from "../../api";

import AddStory from "./AddStory";
import NotificationDot from "./NotificationDot";

import type {NavigationProps} from "../../../components/Navigation";

type StoryProps = NavigationProps<> & {
    read: boolean,
    uri: string,
    id: string
};

class Story extends React.Component<StoryProps> {

    @autobind
    onPress() {
        const {navigation, id} = this.props;
        navigation.navigate("Story", { id });
    }

    render(): React.Node {
        const {onPress} = this;
        const {read, uri} = this.props;
        return (
            <TouchableOpacity {...{onPress}}>
                <View style={[styles.story, { opacity: read ? 0.3 : 1 }]}>
                    <Avatar size={48} {...{uri}} />
                    {
                        !read && <NotificationDot style={styles.dot} />
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

export default class Stories extends React.Component<NavigationProps<>> {

    render(): React.Node {
        const {navigation} = this.props;
        const stories = SocialAPI.stories;
        return (
            <ScrollView contentContainerStyle={styles.stories} horizontal={true}>
                <AddStory />
                {
                    stories.map(story => {
                        const user = SocialAPI.user(story.user);
                        return (
                            <Story
                                key={story.id}
                                uri={user.picture}
                                read={story.read}
                                id={story.id}
                                {...{navigation}}
                            />
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    stories: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        height: 80
    },
    story: {
        marginLeft: StyleGuide.spacing.small
    },
    dot: {
        position: "absolute",
        top: 0,
        right: 0
    }
});
