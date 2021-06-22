const discord = require('discord.js')
const pagination = require('discord.js-pagination');

module.exports.run = async (Client, message, prefix, args) => {
    if(!message.content.startsWith(prefix)) return;

    const page1 = new discord.MessageEmbed()
    .setImage(message.guild.iconURL())
    .setTitle('Normal Commands')
    .setColor('#aa85ce')
    .addFields(
    { name: "afk [reason]", value: "You will became afk and anyone who pings you will get a message saying so", inline: true },
    { name: "info", value: "This gives you all the bot information in an embeded message", inline: true },
    { name: "poll [question channel]", value: "You will ask a question and it it makes an embed with yes or no reactions", inline: true },
    { name: "serverinfo", value: "This will show the server information of the serer you are in", inline: true },
    { name: "ship [user]", value: "Ships you with another user in the server and gives a rating", inline: true },
    { name: "user [user]", value: "Will give information on a user or yourself if no one is mentioned", inline: true }

    )
    const page2 = new discord.MessageEmbed()
    .setTitle('Economy commands')
    .setColor('#aa85ce')
    .addFields(
    { name: "**Work**", value: `Work and get more ogres`, inline: true },
      { name: "**Beg**", value: `Beg and get some ogres`, inline: true },
      { name: "**Crime**", value: `There is a chance you will get caught`, inline: true },
      { name: "**Bal**", value: 'Show your balance', inline: true },
      { name: "**Profile**", value: 'Show your profile', inline: true },
      { name: "**Withdraw**", value: 'Withdraw ogres from your bank', inline: true },
      { name: "**Dep**", value: 'Deposit ogres into your bank', inline: true },
      { name: "**Shop**", value: 'The shop will show up', inline: true },
      { name: "**Buy**", value: 'Buy items if you wish', inline: true },
      { name: "**Sell**", value: 'Sell items if you wish', inline: true },
      { name: "**wheel**", value: 'Wheel you have a chance to win or lose', inline: true },
      { name: "**Slots**", value: 'Slots you have a chance to win or lose', inline: true }
    )


    const pages = [
        page1,
        page2,
    ]

    const emoji = ["⏪", "⏩"]

    const timeout = '100000'

    pagination(message, pages, emoji, timeout)
}

module.exports.help = {
    name: 'help',
    aliases: []
}