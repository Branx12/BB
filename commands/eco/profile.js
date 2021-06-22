const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix


  let user = message.mentions.members.first() || message.author;

  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let candy = await db.fetch(`candy_${message.guild.id}_${user.id}`)
    if(candy === null) candy = '0'

  let honey = await db.fetch(`honey pot_${message.guild.id}_${user.id}`)
  if(honey === null) honey = '0'

  let bomb = await db.fetch(`bomb_${message.guild.id}_${user.id}`)
  if(bomb === null) bomb = '0'

  let car = await db.fetch(`car_${message.guild.id}_${user.id}`)
  if(car === null) car = '0'

  let moneyEmbed = new Discord.MessageEmbed()
  .setTitle("Inventory")
  .setAuthor(`Economy Profile of ${user.username}`, user.displayAvatarURL({dynamic: true, size: 2048}))
  .setColor("#aa85ce")
  .addFields(
    { name: "**Pocket**", value: `${bal} 👹`, inline: true },
    { name: "**Bank**", value: `${bank} 👹`, inline: true },
    { name: "**Candy**", value: `${candy} 🍬`, inline: true },
    { name: "**Honey**", value: `${honey} 🍯`, inline: true },
    { name: "**Bomb**", value: `${bomb} 💣`, inline: true },
    { name: "**Car**", value: `${car} 🏎️`, inline: true }

  )







  message.channel.send(moneyEmbed)
};

module.exports.help = {
  name:"profile",
  aliases: ["pro"]
}