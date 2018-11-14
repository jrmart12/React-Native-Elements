// @flow

import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Button, StyleGuide, Text, Image} from "../../components";

import PlayerProvider, {withPlayer, type PlayerProps} from "./Player";
import PlaylistThumbnail from "./PlaylistThumbnail";

import {type Playlist} from "./Model";

type AlbumHeaderProps = PlayerProps & {
    playlist: Playlist
};

class PlaylistHeader extends React.Component<AlbumHeaderProps> {

    toggle = () => {
        const playerProvider = PlayerProvider.getInstance();
        const {playlist} = this.props;
        const playlistEntry = playlist.entries[0];
        if (playerProvider.isSongPlaying(playlist, playlistEntry)) {
            playerProvider.toggle();
        } else {
            playerProvider.play(playlist, playlistEntry);
        }
    }

    shuffle = () => {
        const playerProvider = PlayerProvider.getInstance();
        const {playlist} = this.props;
        playerProvider.shuffle(playlist);
    }

    render(): React.Node {
        const {playlist, player} = this.props;
        const artists = playlist.isAlbum ?
            playlist.entries[0].album.name :
            playlist.entries.map(entry => entry.album.artist).join(", ");
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    {
                        playlist.isAlbum && (
                            <Image {...playlist.entries[0].album.picture} style={styles.image} />
                        )
                    }
                    {
                        !playlist.isAlbum && (
                            <PlaylistThumbnail size={80} style={styles.cover} {...{playlist}} />
                        )
                    }
                    <View style={styles.metadata}>
                        <Text type="headline" numberOfLines={1}>{playlist.name}</Text>
                        <Text type="footnote" numberOfLines={1}>{artists}</Text>
                    </View>
                </View>
                <View style={styles.controls}>
                    <View style={styles.leftControl}>
                        <Button
                            icon="play"
                            onPress={this.toggle}
                            disabled={player.locked}
                            secondary
                        />
                    </View>
                    <View style={styles.rightControl}>
                        <Button icon="shuffle" secondary onPress={this.shuffle} disabled={player.locked} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...StyleGuide.styles.shadow,
        zIndex: 1000
    },
    header: {
        flexDirection: "row",
        padding: StyleGuide.spacing.small
    },
    image: {
        width: 80,
        height: 80,
        marginRight: StyleGuide.spacing.small
    },
    cover: {
        marginRight: StyleGuide.spacing.small
    },
    metadata: {
        flex: 1
    },
    controls: {
        flexDirection: "row",
        paddingHorizontal: StyleGuide.spacing.small
    },
    leftControl: {
        flex: 1,
        marginRight: StyleGuide.spacing.tiny
    },
    rightControl: {
        flex: 1,
        marginLeft: StyleGuide.spacing.tiny
    }
});

export default withPlayer(PlaylistHeader);
