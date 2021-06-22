const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    const embed = new Discord.MessageEmbed()
    .setDescription(`**Ogres 👹 Leaderboard**`)
    .setColor("#aa85ce")


  if(!args[0]) return message.channel.send(embed)

    if (args[0] == 'ogres') {
    let money = db.has(`money_${message.guild.id}`, { sort: '.data'})
    let content = "";

    for (let i = 0; i < money.length; i++) {
        let user = bot.users.get(money[i].ID.split('_')[2]).username

      

        content += `${i+1}. ${user} ~ ${money[i].data}\n`
    
      }

    const embed = new Discord.MessageEmbed()
    .setDescription(`**${message.guild.name}'s Ogre 👹 Leaderboard**\n\n${content}`)
    .setColor("#aa85ce")

    message.channel.send(embed)

  }

}
module.exports.help = {
  name:"lb",
  aliases: ["leader"]
}