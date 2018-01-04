// @flow
import * as _ from "lodash";
import type {Picture} from "../../components/Model";

const users = require("./users");
const posts = require("./posts");
const stories = require("./stories");

export type User = {
    id: string,
    name: string,
    picture: string,
    caption: string
};

export type Post = {
    id: string,
    user: string,
    picture?: Picture,
    caption: string,
    timestamp: number,
    comments: string[]
};

export type Comment = {
    user: string,
    comment: string,
    timestamp: number
};

export type Story = {
    id: string,
    user: string,
    picture: Picture,
    comments: Comment[],
    read: boolean
};

export type Social = {
    users: User[],
    posts: Post[],
    stories: Story[],
    user: string => User,
    story: string => Story
};

const api: Social = {
     users,
     posts,
     stories: _.sortBy(stories, story => story.read, ["desc"]),
     user: (id: string): User => users.filter(user => user.id === id)[0],
     story: (id: string): Story => stories.filter(story => story.id === id)[0],
 };

 export default api;
