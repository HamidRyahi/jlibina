module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
}