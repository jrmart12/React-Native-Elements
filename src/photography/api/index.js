// @flow
const photos = require("./photos");

export type Photo = {
    id: string,
    album: string,
    created_at: string,
    location?: {
      title: string,
      name: string,
      city: string,
      country: string,
      position: {
        latitude: number,
        longitude: number
      }
    },
    urls: {
        full: string,
        regular: string,
        small: string,
        preview: string
    }
};

type Photography = {
    photos: Photo[]
};

const api: Photography = {
    photos
};

export default api;
