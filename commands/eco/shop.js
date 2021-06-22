const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    let embed = new Discord.MessageEmbed()
    .setColor("#aa85ce")
    .addField(`SHOP`, [
        `Candy 🍬 500 ogres 👹 `,
        `\u200B`,
        `Honey 🍯 800 ogres 👹 `,
        `\u200B`,
        `Bomb 💣 1000 ogres 👹 `,
        `\u200B`,
        `Car 🏎️ 1300 ogres 👹 `,

    ])

    message.channel.send(embed)




}


module.exports.help = {
  name:"shop",
  aliases: ["st"]
}