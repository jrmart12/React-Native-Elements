// @flow
import * as _ from "lodash";

import type {Photography} from "../../components/photography/Model";
import axios from 'axios';

function getInfo() {
     var info = [];
     axios.get("https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/").then(data => {
         const post = data.data.posts;
        
         for (let index = 0; index < post.length; index++) {
             info.push(post[index].featured_image);
         }
         
     }).catch(err => console.log(err.message)); //eslint-disable-line   
     return info;
 }


 const photos = getInfo();

const albums = _.groupBy(photos, "album");
const api: Photography = {
    photos,
    albums,
    album: (album: string) => albums[album]
};

export default api;
