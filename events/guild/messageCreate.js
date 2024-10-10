const players = []
module.exports = async (client, Discord, message) => {
    let prefix = '+';
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.channel.id !== "1294017400911691876") return;
    //
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    //
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    //
    if (command) command.execute(client, message, args, players);
}