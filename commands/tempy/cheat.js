module.exports = {
    name: 'cheat',
    description: '',
    async execute(client, message, args, players) {
        console.log(players);
        for (let i = 0; i < players.length; i++) {
            if (message.author.id === players[i].id) {
                message.reply(players[i].correctNumber.join(', '));
            }
        }
    }
}