const discord = require('discord.js'); // requiring discord modules
const moment = require(`moment`) // requiring moment

module.exports.run = async (Client, message, args, prefix) => { // 4 my cmds handler
    if(!message.content.startsWith(prefix)) return; // check if the cmd start with the prefix


    var botEmbed = new discord.MessageEmbed() // creates a embed that we gonna call botEmbed
    .setColor(`#aa85ce`) // will set the color for the embed
    .setTitle(`___**Bot Information**___`) // make the title for the cmd
    .setURL('')
    .setFooter('Last checked', 'https://i.pinimg.com/236x/cc/66/4b/cc664bf740a73124cb03b288f978c899--artists.jpg')
    .addFields(
        { name: "Developers: ", value: "<@833218970399277096>", inline: true },
        { name: "\u200B Version:", value: "\u200B 1.0.0", inline: true },
        { name: "Avg. Ping", value: "30", inline: true }

    )

    .addFields(
        { name: "Library:", value: "discord.js", inline: true },
        { name: "\u200B Running on:", value: "\u200B 1 server", inline: true },
        { name: "Used by:", value: "1 user", inline: true }

    )

    .addField(`**Extra Information:**`,[ //Extra Information goes here
        `Liking the bot? Bran appreicates it. There is soon to be updates, much more to come!`, // who created the bot
        `Want to add the bot to your server? Click here: https://discord.com/api/oauth2/authorize?client_id=850200266299932722&permissions=4294967287&scope=bot`,
        `Don't forget to check out our website: https://brans-discord-bot.glitch.me/`,
        

    ])

.setTimestamp()

    message.channel.send(botEmbed) // it sends the embed
}
module.exports.help = { // 5 my cmds handler
    name: "info", // name of the cmd
    aliases: ['bot', 'bot-info'] // another name for the bot
}