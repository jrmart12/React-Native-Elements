// @flow
import type {Picture} from "../Model";

export type User = {
    id: string,
    name: string,
    picture: string,
    caption: string,
    cover: Picture
};

export type Post = {
    id: string,
    user: string,
    picture?: Picture,
    caption: string,
    timestamp: number,
    comments: string[]
};

export type MessageThread = {
    id: string,
    user: string,
    messages: Message[]
};

export type Message = {
    id: string,
    me: boolean,
    message: string,
    timestamp: number
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
    messages: MessageThread[],
    users: User[],
    posts: Post[],
    stories: Story[],
    user: string => User,
    story: string => Story,
    messageThread: string => MessageThread,
    me: () => User,
    myPosts: Post[]
};
