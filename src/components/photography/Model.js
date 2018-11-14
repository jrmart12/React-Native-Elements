// @flow
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

export type Photography = {
    photos: Photo[],
    albums: { [name: string]: Photo[] },
    album: string => Photo[]
};
