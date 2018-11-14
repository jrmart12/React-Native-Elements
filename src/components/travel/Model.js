// @flow
import type {Picture, Location} from "../../components/Model";

export type Guide = {
    id: string,
    country: string,
    city: string,
    picture: Picture,
    duration: number,
    location: Location,
    visits: Visit[]
};

export type Visit = {
    name: string,
    address: string,
    location: Location
};

type Place = {
    id: string,
    title: string,
    subtitle: string,
    ratings: number,
    reviews: number,
    picture: Picture,
    coordinate: Location,
    featured: boolean
};

export type Restaurant = Place;
export type Hotel = Place;

export type City = {
    id: string,
    country: string,
    city: string,
    description: string,
    picture: Picture,
    location: Location,
    restaurants: Restaurant[],
    hotels: Hotel[]
};

export type Travel = {
    guides: Guide[],
    cities: City[]
};
