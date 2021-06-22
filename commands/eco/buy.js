const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix

    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#aa85ce")
    .setDescription(`${user} You need 500 ogres 👹 to purchase candy 🍬`);

    if (args[0] == 'candy') {
        if (author < 500) return message.channel.send(Embed)
        
        db.fetch(`candy_${message.guild.id}_${user.id}`);
        db.set(`candy_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Purchased candy 🍬 for 500 ogres 👹 `);

        db.subtract(`money_${message.guild.id}_${user.id}`, 500)
        message.channel.send(Embed2)
    } else if(args[0] == 'honey pot') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} You need 800 ogres 👹 to purchase a honey pot 🍯`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`honey pot_${message.guild.id}_${user.id}`)
        db.add(`honey pot_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Purchased the one and only honey pot 🍯 for 800 ogres 👹`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'bomb') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} You need 1000 ogres 👹 to purchase a bomb 💣`);

        if (author < 1000) return message.channel.send(Embed2)
       
        db.fetch(`bomb_${message.guild.id}_${user.id}`)
        db.add(`bomb_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Purchased a a bomb 💣 for 1000 ogres 👹 i wonder what you will use that for... `);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1000)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} You need 1300 ogres 👹 to purchase a car 🏎️`);

        if (author < 1300) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription(`${user} Purchased a brand new car 🏎️ for 1300 ogres 👹`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1300)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.MessageEmbed()
        .setColor("#aa85ce")
        .setDescription('Usage: buy <item>')
        message.channel.send(embed3)
    }

}
  
  module.exports.help = {
    name:"buy",
    aliases: [""]
  }