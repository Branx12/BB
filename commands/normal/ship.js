const discord = require('discord.js')

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    let user = message.mentions.users.first()
    let RN = Math.floor(Math.random() * 100) + 1

    if(!user) return message.channel.send('Please mention a user to ship')
    if(user === message.author) return message.channel.send('Please mention someone and not yourself')

    const UnloveEmbed = new discord.MessageEmbed() 
    .setTitle('This isn\'t a match')
    .setThumbnail('https://cdn.discordapp.com/attachments/851304035532275732/851308615057932308/5a058c259cf05203c4b603f0.png')
    .setDescription(`${message.author} shipped with ${user} and it is ${RN}%`)
    .setColor("#aa85ce")

    const loveEmbed = new discord.MessageEmbed() 
    .setTitle('They are born for each others')
    .setThumbnail('https://cdn.discordapp.com/attachments/851304035532275732/851308916901937172/small-red-heart-with-transparent-background-md.png')
    .setDescription(`${message.author} shipped with ${user} and it is ${RN}%`)
    .setColor("#aa85ce")

    if(RN > 50) {
        message.channel.send(loveEmbed)
    } else {
        message.channel.send(UnloveEmbed)
    }


}

module.exports.help = {
    name: 'ship',
    aliases: []
}