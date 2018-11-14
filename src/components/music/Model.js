// @flow
import type {Picture} from "../../components/Model";

export type Track = {
    name: string,
    uri: string
};

export type Album = {
    id: string,
    name: string,
    artist: string,
    picture: Picture
};

export type PlaylistEntry = {
    album: Album,
    track: Track
};

export type Playlist = {
    id: string,
    name: string,
    entries: PlaylistEntry[]
};

export type User = {
    id: string,
    name: string,
    picture: string,
    caption: string,
    cover: Picture
};

export type Music = {
    albums: Album[],
    tracks: string => Track[],
    playlists: Playlist[],
    me: User,
    transformAlbumToPlaylist: Album => Playlist
};
