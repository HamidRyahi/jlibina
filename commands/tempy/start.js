const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'start',
    description: 'This command is for starting a new game',
    async execute(client, message, args, players) {
        
        console.log('players array: ', players);
        const validNumbers = ['6', '7', '8', '9', '10'];
        let theNumber = [];


        function generateNonRepeatingRandomNumbers(count, max) {
            let numbers = Array.from({length: max}, (_, i) => i);
            let result = [];
            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * numbers.length);
                result.push(numbers[randomIndex]);
                numbers.splice(randomIndex, 1);
            }
            return result;
        }




        // if default
        if (args?.length === 0) {
            theNumber = generateNonRepeatingRandomNumbers(5, 10);
          
            
            for (let i = 0; i < players.length; i++) {
                // if already have a running game
                if (players[i].id === message.author.id) {
                    console.log('players array: ', players)
                    const msgEmbed = new MessageEmbed()
                        .setColor('#ffff00')
                        .setTitle(`You already have a running game!`)
                        .setDescription(`To stop your running game please type +end`)
                    return message.reply({ embeds: [msgEmbed] })
                        .catch(console.error);
                }
            }
            players.push({
                id: message.author.id,
                correctNumber: theNumber
            })
            //
            console.log('players array: ', players)
            const msgEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle(`Your game started!`)
                .setDescription(`Try to guess the correct number`)
                .setFooter(`Player: ${message.author.username}#${message.author.discriminator}`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`)
            message.reply({ embeds: [msgEmbed] })
                .catch(console.error);


            // if specific number
        } else if (args?.length !== 0 && validNumbers.includes(args[0])) {
            theNumber = generateNonRepeatingRandomNumbers(parseInt(args[0]), 10);

            for (let i = 0; i < players.length; i++) {
                // if already have a running game
                if (players[i].id === message.author.id) {
                    console.log('players array: ', players)
                    const msgEmbed = new MessageEmbed()
                        .setColor('#ffff00')
                        .setTitle(`You already have a running game!`)
                        .setDescription(`To stop your running game please type +end`)
                    return message.reply({ embeds: [msgEmbed] })
                        .catch(console.error);
                }
            }
            players.push({
                id: message.author.id,
                correctNumber: theNumber
            })
            console.log('players array: ', players)
            const msgEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle(`Your game started!`)
                .setDescription(`Try to guess the correct number`)
                .setFooter(`Player: ${message.author.username}#${message.author.discriminator}`)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`)
            message.reply({ embeds: [msgEmbed] })
                .catch(console.error);
        }



        const filter = m => m.content.replace(/[^\d]/g, "").length === theNumber.length && m.author.id === message.author.id
        const collector = message.channel.createMessageCollector({ filter, time: 480000 });
        collector.on('collect', m => {
            let response = []
            let found = false
            for (let i = 0; i < players.length; i++) {
                if (players[i].id === message.author.id) {
                    found = true
                }
            }
            if (found === false) return collector.stop()

            for (i = 0; i < theNumber.length; i++) {
                if (parseInt(m.content.replace(/[^\d.]/g, "").charAt(i)) === theNumber[i]) {
                    response.push('🟢')
                } else if (parseInt(m.content.replace(/[^\d.]/g, "").charAt(i)) !== theNumber[i]) {
                    if (theNumber.includes(parseInt(m.content.replace(/[^\d.]/g, "").charAt(i)))) {
                        response.push('🟠')
                    } else {
                        response.push('🔴')
                    }
                }
            }
            if (!response.includes('🟠') && !response.includes('🔴')) {
                collector.stop()
                for (let i = 0; i < players.length; i++) {
                    if (players[i].id === message.author.id) {
                        players.splice(i, 1)
                    }
                }
            }
            const msgEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setDescription(`${response.join(' ')}`)
                .setFooter(`Player: ${message.author.username}#${message.author.discriminator}`)
            m.reply({ embeds: [msgEmbed] })
                .catch(console.error);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            const msgEmbed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle(`Your game ended!`)
                .setDescription(`The correct number was **${theNumber}**`)
                .setFooter(`To start a new one please type +start`)
            // message.reply({ embeds: [msgEmbed] })
            //     .catch(console.error);
            for (let i = 0; i < players.length; i++) {
                if (players[i].id === message.author.id) {
                    players.splice(i, 1)
                }
            }
        });



    }
}