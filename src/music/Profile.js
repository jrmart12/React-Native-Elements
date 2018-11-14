// @flow
import * as _ from "lodash";

import * as React from "react";
import {StyleSheet, View} from "react-native";

import {
    Container, Header, NavigationBar, Text, StyleGuide, SegmentedControl, Content, Avatar,
    type NavigationProps
} from "../components";

import MusicAPI from "./api";
import {PlayerProvider, Playlist, Album, withPlayer, type PlayerProps} from "../components/music";

type ProfileState = {
  selectedIndex: number
};

class Profile extends React.Component<PlayerProps & NavigationProps<>, ProfileState> {

    state = {
        selectedIndex: 0
    };

    onChange = (selectedIndex: number) => this.setState({ selectedIndex });

    onPress = async (): Promise<void> => {
        const playerProvider = PlayerProvider.getInstance();
        const {navigation} = this.props;
        if (PlayerProvider.sound) {
            await playerProvider.sound.unloadAsync();
        }
        navigation.navigate("Welcome");
    }

    render(): React.Node {
        const {onPress, onChange} = this;
        const {navigation} = this.props;
        const {selectedIndex} = this.state;
        const {me, playlists, albums} = MusicAPI;
        const from = "profile";
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
                            values={["Playlists", "Albums"]}
                            {...{selectedIndex, onChange}}
                        />
                    </View>
                </Header>
                <Content style={styles.content}>
                    {
                        selectedIndex === 0 &&
                            playlists.map(playlist => (
                                <Playlist key={playlist.id} {...{playlist, navigation, from}} />
                            ))
                    }
                    {
                        selectedIndex === 1 && _.chunk(albums, 2).map((row, index) => (
                            <View style={styles.row} key={index}>
                                {
                                    row.map(album => <Album key={album.id} {...{album, navigation, from}} />)
                                }
                            </View>
                        ))
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
        paddingBottom: StyleGuide.spacing.small + 64
    },
    row: {
        flexDirection: "row",
        marginTop: StyleGuide.spacing.small,
        marginRight: StyleGuide.spacing.small
    }
});

export default withPlayer(Profile);
