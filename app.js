const keepAlive = require("./server.js");
const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });
require("dotenv").config();
client.commands = new Collection();
client.events = new Collection();
['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})
client.login(process.env.TOKEN);
keepAlive();
