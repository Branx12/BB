const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (Client, message, args, prefix) => {
 
    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    let ownerID = 'Your ID'
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#aa85ce")
    .setDescription(`${user} Removed ${args[1]} ogres\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)

};


module.exports.help = {
  name:"remove",
  aliases: ["rm"]
}