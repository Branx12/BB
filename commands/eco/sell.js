const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (Client, message, args, prefix) => {
 
    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    let user = message.author;

    if(args[0] == 'candy') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} You don't have Candy 🍬 to sell`);

        let candy = await db.fetch(`candy_${message.guild.id}_${user.id}`)

        if (candy < 1) return message.channel.send(Embed2)
       
        db.fetch(`candy_${message.guild.id}_${user.id}`)
        db.subtract(`candy_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Sold Candy 🍬 For 500 Ogres 👹`);

        db.add(`money_${message.guild.id}_${user.id}`, 500)
        message.channel.send(Embed3)
    } else if(args[0] == 'honey') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} You don't have Honey 🍯 to sell`);

       let honey = await db.fetch(`honey pot_${message.guild.id}_${user.id}`)

        if (honey < 1) return message.channel.send(Embed2)
       
        db.fetch(`honey pot_${message.guild.id}_${user.id}`)
        db.subtract(`honey pot_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Sold Honey 🍯 For 800 Ogres 👹`);

        db.add(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'bomb') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} You don't have a Bomb 💣 to sell`);

        let bomb = await db.fetch(`bomb_${message.guild.id}_${user.id}`)

        if (bomb < 1) return message.channel.send(Embed2)
       
        db.fetch(`bomb_${message.guild.id}_${user.id}`)
        db.subtract(`bomb_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Sold a Bomb 💣 For 1000 Ogres 👹`);

        db.add(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    };

}
  
  module.exports.help = {
    name:"sell",
    aliases: [""]
  }