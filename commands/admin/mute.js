const discord = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {


// this will check to see if the user has to perm to mute a member
    if(!message.member.hasPermission('MUTE_MEMBERS')) return;
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
    if(member.hasPermission(['MUTE_MEMBERS']) && !message.member.hasPermission('MUTE_MEMBERS')) return;

// add the muted and remove the member role
    let mutedRole = message.guild.roles.cache.get('850523674000097351'); // Puts the mute role on the member
    let verifiedRole = message.guild.roles.cache.get('849911915873566780'); // Takes the member role off the member
    if(mutedRole) {
        member.roles.add(mutedRole);
        member.roles.remove(verifiedRole);
// sends this message when the bot mutes a member
        message.channel.send(`You have muted ${member}🤫`);
    }

}

module.exports.help = {
    name: `mute`,
    aliases: []
};