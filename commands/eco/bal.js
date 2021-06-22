const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (Client, message, args, prefix) => {
 
    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (bank === null) bank = 0;


  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#aa85ce")
  .setTitle(`**${user.tag}'s Bank**`)
  .addFields(
    { name: "**Pocket:**", value: `${bal} 👹`, inline: true },
    { name: "**Bank:**", value: `${bank} 👹`, inline: true },
    { name: "**Total:**", value: `${bank + bal} 👹`, inline: true }

)
  message.channel.send(moneyEmbed)
};

module.exports.help = {
  name:"bal",
  aliases: []
}