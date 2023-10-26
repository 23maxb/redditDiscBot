const snoowrap = require('snoowrap');
const REDDITID = require("fs").readFileSync("redditAccess/redditSecret.txt").toString();
const MYPW = require("fs").readFileSync("redditAccess/redditPassword.txt").toString();
const r = new snoowrap({
    userAgent: 'redditBotByTheBladeBattler',
    clientId: 'khuDsX-x4-c9ZG9TzeSlQg',
    clientSecret: REDDITID,
    username: 'TheBladeBattler',
    password: MYPW
});

export async function getRandomHotPost(subreddit) {
    const submissions = await r.getSubreddit(subreddit).getHot();
    const randomIndex = Math.floor(Math.random() * submissions.length);
    const randomPost = submissions[randomIndex];
    return [randomPost.title, randomPost.url];
}