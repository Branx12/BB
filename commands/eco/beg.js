const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("parse-ms");

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

  let user = message.author;

  let timeout = 14400000;
  let amount = 50;

  let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#aa85ce")
    .setDescription(`You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s ${user}`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("#aa85ce")
  .setDescription(`You've begged and received ${amount} ogres 👹 ${user}`);
  message.channel.send(moneyEmbed)
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`beg_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"beg",
  aliases: [""]
}