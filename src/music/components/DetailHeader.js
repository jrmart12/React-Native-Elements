// @flow
import * as _ from "lodash";
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";
import {observer} from "mobx-react/native";

import {Button, StyleGuide, Image, Text} from "../../components";
import {withPlayer, type PlayerProps} from "./Player";
import MusicAPI, {type Album} from "../api";

type DetailHeaderProps = PlayerProps & {
    album: Album
};

@observer
class DetailHeader extends React.Component<DetailHeaderProps> {

    @autobind
    toggle() {
        const {album, player} = this.props;
        const tracks = MusicAPI.tracks(album.id);
        if (player.isSongPlaying(tracks[0])) {
            player.toggle();
        } else {
            player.play(album, tracks[0]);
        }
    }

    @autobind
    shuffle() {
        const {album, player} = this.props;
        const tracks = MusicAPI.tracks(album.id).filter(track => !player.isSongPlaying(track));
        const track = _.sample(tracks);
        player.play(album, track);
    }

    render(): React.Node {
        const {album, player} = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Image {...album.picture} style={styles.image} />
                    <View>
                        <Text type="headline">{album.name}</Text>
                        <Text type="footnote">{album.artist}</Text>
                    </View>
                </View>
                <View style={styles.controls}>
                    <View style={styles.leftControl}>
                        <Button
                            icon={player.isAlbumPlaying(album) ? "pause" : "play"}
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

export default withPlayer(DetailHeader);
