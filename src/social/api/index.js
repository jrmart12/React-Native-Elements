// @flow
import * as _ from "lodash";

import type {Social, User, Story, MessageThread} from "../../components/social/Model";

const users = require("./users");
const posts = require("./posts");
const myPosts = require("./my-posts");
const stories = require("./stories");
const messages = require("./messages");

const api: Social = {
    messages,
    users,
    posts,
    stories: _.sortBy(stories, story => story.read),
    user: (id: string): User => users.filter(user => user.id === id)[0],
    story: (id: string): Story => stories.filter(story => story.id === id)[0],
    messageThread: (id: string): MessageThread => messages.filter(thread => thread.id === id)[0],
    me: (): User => users.filter(user => user.id === "schavez")[0],
    myPosts
};

export default api;
