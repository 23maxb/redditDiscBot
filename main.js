//https://discord.com/api/oauth2/authorize?client_id=1166905604909043772&permissions=8&scope=bot
const TOKEN = require("fs").readFileSync("./token.txt").toString();
const Discord = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");
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
    const id = msg.author.id;
    if (msg.content === 'ping') {
        msg.reply('pong').then(r => console.log(r));
        msg.react('👍').then(r => console.log(r));
    } else if (msg.content === 'check') {
        client.channels.cache.get(msg.channel.id).send('your ip is 141.12.12.1');
    }
});

client.on("interactionCreate", interaction => {
    if (!interaction.isCommand()) return;
    const {commandName} = interaction;
    let a = new SlashCommandBuilder('checkmate', );

    if (commandName === 'check') {
        interaction.reply('mate!').then(r => console.log(r));
    }
});


client.login(TOKEN).then(r => console.log(r));