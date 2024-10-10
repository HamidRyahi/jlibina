const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'stop',
    description: 'This command is for canceling an old game',
    async execute(client, message, args, players) {
        let isFound = false
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === message.author.id) {
                isFound = true
                players.splice(i, 1)
                console.log('players array: ', players)
                const msgEmbed = new MessageEmbed()
                    .setColor('#ffff00')
                    .setTitle(`You have stopped your game!`)
                    .setDescription(`To start a new game please type .start`)
                return message.reply({ embeds: [msgEmbed] })
                    .catch(console.error);
            }
        }
        if (isFound === false) {
            console.log('players array: ', players)
            const msgEmbed = new MessageEmbed()
                .setColor('#ffff00')
                .setTitle(`You don't have a running game!`)
                .setDescription(`To start a new game please type .start`)
            return message.reply({ embeds: [msgEmbed] })
                .catch(console.error);
        }
    }
}