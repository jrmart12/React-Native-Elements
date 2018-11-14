// @flow
import * as _ from "lodash";

import type {Photography} from "../../components/photography/Model";

const photos = require("./photos");

const albums = _.groupBy(photos, "album");
const api: Photography = {
    photos,
    albums,
    album: (album: string) => albums[album]
};

export default api;
