// @flow
import type {Picture} from "../../components/Model";

const albums = require("./albums");
const heartsWereGold = require("./albums/hearts-were-gold");
const brother = require("./albums/brother");
const whereWeWere = require("./albums/where-we-were");
const ribbons = require("./albums/ribbons");
const doSomethingBeautiful = require("./albums/do-something-beautiful");
const goGetGone = require("./albums/go-get-gone");
const inColour = require("./albums/in-colour");
const mountains = require("./albums/mountains");
const pyk = require("./albums/pyk");
const melodrama = require("./albums/melodrama");
const ibnRlLeil = require("./albums/ibn-el-leil");
const shakira = require("./albums/shakira");

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

export type Music = {
    albums: Album[],
    tracks: string => Track[]
};

const tracks: { [album: string]: Track[] } = {
    "hearts-were-gold": heartsWereGold,
    brother,
    "where-we-were": whereWeWere,
    ribbons,
    "do-something-beautiful": doSomethingBeautiful,
    "go-get-gone": goGetGone,
    "in-colour": inColour,
    mountains,
    pyk,
    melodrama,
    "ibn-el-leil": ibnRlLeil,
    shakira
}

 const api: Music = {
     albums,
     tracks: (album: string) => tracks[album]
 };

 export default api;
