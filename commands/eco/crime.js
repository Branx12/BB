const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("parse-ms");

module.exports.run = async (Client, message, args, prefix) => {

    if(!message.content.startsWith(prefix)) return; // this check if its starts with the prefix


let user = message.author;

  let timeout = 90000;
  
    let author = await db.fetch(`money_${message.guild.id}_${user.id}.pocket`);
    let multiplier = await db.fetch(`multiplier_${message.guild.id}`);
    if(!multiplier) multiplier = 1;
    let randoma = Math.floor(Math.random() * 300) + 1;
    let random = randoma * multiplier;
        
    if (author < 250) {
          return message.channel.send(`${user} You need at least 300 ogres 👹 to commit a crime`)
      }

      let crime = await db.fetch(`crime_${message.author.id}`)

      if (crime !== null && timeout - (Date.now() - crime) > 0) {
        
        let time = ms_2(timeout - (Date.now() - crime));
        
        message.channel.send(`You already commited a crime! Try again in ${time.minutes}m ${time.seconds}s ${user}`)

      } else {
       
        const result = [
          "WINWIN",
          "LOOSELOOSE"
        ] 

     let awnser = result[Math.floor(Math.random() * result.length)];
        
     if (awnser === "LOOSELOOSE") {
          
      message.channel.send("You were caught and had to pay 150 ogres 👹 to stay out of jail");
         
      await db.subtract(`money_${message.guild.id}_${user.id}.pocket`, 150);
         
      await db.set(`crime_${message.author.id}`, Date.now());
        } else {

    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle("You Have Just Commited A Crime!")
      .addField("Amount Robbed:", random)
      .setColor("#aa85ce")
      .setTimestamp();
      message.channel.send(embed)
    await db.add(`crimecommited_${user.id}`, 1);
    await db.add(`money_${message.guild.id}_${user.id}.pocket`, random);
    await db.set(`crime_${message.author.id}`, Date.now());

      }
    } 
  }

  module.exports.help = {
    name:"crime",
    aliases: [""]
  }