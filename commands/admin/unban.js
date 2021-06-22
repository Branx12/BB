const discord = require("discord.js")

module.exports.run = async (Client, message, args, prefix) => {
    if(!message.content.startsWith(prefix)) return
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`You don't have the correct permission to use this command.`)
    if(!message.member.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`I do not have permission to do this command.`)

    let reason = args.slice(1).join(" ")
    let userId = args[0]

    if(!reason) reason = 'No reason provided';
    if(!userId) return message.channel.send('Please provide the user ID to unban')
    if(isNaN(userId)) return message.channel.send("Please provide a valid user ID")

    message.guild.fetchBans().then(async bans => {
        if(bans.size === 0) return message.channel.send("There has been no bans in this server")
        let BannedUser = bans.find(ban => ban.user.id == userId)
        if(!BannedUser) return message.channel.send('This user is not banned')
        await message.guild.members.unban(BannedUser.user, reason).catch(err =>{
            return message.channel.send("Something went wrong!")
        }).then(() => {
            message.channel.send(`You have unbanned ${userId}`)
        })
    })
}

module.exports.help = {
    name: 'unban',
    aliases: []
}