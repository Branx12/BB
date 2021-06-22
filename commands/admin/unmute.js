const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {


// this will check to see if the member has the permissions below
    if(!message.member.hasPermission('MUTE_MEMBERS')) return;
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(member.hasPermission(['MUTE_MEMBERS']) && !message.member.hasPermission('MUTE_MEMBERS')) return;

//removes the muted role and adds the member role
    let mutedRole = message.guild.roles.cache.get('850523674000097351'); // u put the muted role ID
    let verifiedRole = message.guild.roles.cache.get('849911915873566780'); // the member role ID
    if(mutedRole) {
        member.roles.remove(mutedRole);
        member.roles.add(verifiedRole);
// it will send this message once the bot unmuted the member
        message.channel.send(`You have unmuted ${member}`);
    }

}

module.exports.help = {
    name: `unmute`,
    aliases: []
};