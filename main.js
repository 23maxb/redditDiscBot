//https://discord.com/api/oauth2/authorize?client_id=1166905604909043772&permissions=8&scope=bot
const TOKEN = require("fs").readFileSync("./token.txt").toString();
const CLIENTID = require("fs").readFileSync("./clientid.txt").toString();
const Discord = require("discord.js");
const {REST, Routes} = require("discord.js");
const reddit = require("./redditAccess/snoowrapFetch.js")

const commands = [
    {
        name: "check", description: "replies with hey"
    },
    {
        name: "get post", description: "Gets a reddit post using the api",
    }
]
const rest = new REST({version: "10"}).setToken(TOKEN);

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages
    ]
});

client.on("ready", () => {
    client.user.setStatus('online');
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", msg => {
    if (msg.content === 'ping') {
        msg.reply('pong').then(r => console.log(r));
        msg.react('👍').then(r => console.log(r));
    } else if (msg.content === 'check') {
        client.channels.cache.get(msg.channel.id).send('your ip is 141.12.12.1');
    } else if (msg.content.startsWith('get post')) {
        const args = msg.content.split(' ');
        if (args.length < 3) {
            msg.reply('Please specify a subreddit');
        } else {
            const subreddit = args[2];
            msg.reply('Getting post from subreddit ' + subreddit);
            reddit.
            redditAccess.snooWrapFetch.getRandomHotPost(subreddit).then(post => msg.reply(post[0] + "\n" + post[1]));
        }
    }
    const id = msg.author.id;
    const name = msg.author.username;
    console.log("Message from " + name + " (" + id + "): " + msg.content);
})
;

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand())
        return;
    console.log(interaction.user.username + " used command " + interaction.commandName);

    if (interaction.commandName === 'check') {
        interaction.reply('mate!').then(r => console.log(r));
    }
});


client.login(TOKEN).then(r => console.log(r));