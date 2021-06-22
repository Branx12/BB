// require discord.js
const Discord = require('discord.js');

// connects to config.json

// create a Discord client
const Client = new Discord.Client({disableEveryone: true});

// makes a new command system
Client.commands = new Discord.Collection();

// require fs
const fs = require('fs');

const ms = require('ms');

const db = require('quick.db')

require('dotenv').config();

// it creates a new function for our aliases

Client.aliases = new Discord.Collection();

const Canvacord = require('canvacord')


Client.on('messageDelete', (message) => {
    const LogChannel = Client.channels.cache.get('856920031852888104')
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
    .addField('Deleted by', `${message.author} - (${message.author.id})`)
    .addField("In", message.channel)
    .addField('Content', message.content)
    .setColor("#aa85ce")
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    LogChannel.send(DeletedLog)

})

Client.on('messageUpdate', async(oldMessage, newMessage) => {
    const LogChannel = Client.channels.cache.get('856920031852888104')
    const EditedLog = new Discord.MessageEmbed()
    .setTitle("Edited Message")
    .addField('Edited by', `${oldMessage.author} - (${oldMessage.author.id})`)
    .addField("In", oldMessage.channel)
    .addField('Old Message', oldMessage.content)
    .addField('New Message', newMessage.content)
    .setColor("#aa85ce")
    .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true}))
    await LogChannel.send(EditedLog)

})



Client.on("ready", () => {
    const guild = Client.guilds.cache.get('849848340958543893');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('856918494137679922')
        channel.setName(`🌎Members: ${memberCount.toLocaleString()}`)
    }, 30000);
});





// Commands Handler 

// get into the cmds folder
fs.readdirSync('./commands/').forEach(dir => {

    //in the cmds folder, we gonna check for the category
    fs.readdir(`./commands/${dir}`, (err, files) => {

        // console log err (catch err)
        if (err) throw err;

         // checking if the files ends with .js if its a javascript file
        var jsFiles = files.filter(f => f.split(".").pop() === "js");

         // if there is no cmds in the file it will return
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        
        jsFiles.forEach(file => {

            // console the loaded cmds 
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`File ${file} was loaded`)

            // gonna let the cmds run
            try {
                Client.commands.set(fileGet.help.name, fileGet);

                // it search in the cmds folder if there is any aliases
                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);
                })

            } catch (err) {
              // catch err in console  
                return console.log(err);
            }
        });
    });
});


const activities_list = [
    "Hi! It's me Bran's Bot!", 
    "twitch.tv/bizvic",
    "💬general"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

Client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        Client.user.setActivity(activities_list[index], { type: 'WATCHING' }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});



// what it says when the bot goes online
Client.on("ready", async () => {
    console.log(`${Client.user.username} is Online!`)

});




Client.on("message", async (message, guild) => {

    if(message.author.Client) return;
    if(message.channel.type === "dm") {
        const dmEmbed = new Discord.MessageEmbed()
        .setTitle('New DM')
        .setColor("#aa85ce")
        .setDescription(`**User:** ${message.author.tag}\n**User ID:** ${message.author.id}\n**At:** ${new Date()}\n\n**Content:** \`\`\`${message.content}\`\`\``)

        const DMC = Client.channels.cache.get('851304035532275732')
        DMC.send(dmEmbed)
    }

 // deleting his afk if he send a msg

 if(db.has(`afk-${message.author.id}+${message.guild.id}`)) { // if he has afk
    const oldReason = db.get(`afk-${message.author.id}+${message.guild.id}`) // get the reason 
    await db.delete(`afk-${message.author.id}+${message.guild.id}`) // delete it after u get it
    message.reply(`You aren't afk anymore`) // send this msg
}


// checking if someone mentioned the afk person

if(message.mentions.members.first()) { // if someone mentioned the person
    if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) { // db will check if he is afk
        message.channel.send(message.mentions.members.first().user.tag + " afk reason: " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) // if yes, it gets from the db the afk msg and send it
    }
 }




    let prefix;
    // no one did =setprefix
        let prefixes = await db.fetch(`prefix_${message.guild.id}`);
        if(prefixes == null) {
            prefix = "." // this will be the default prefix
        } else {
            prefix = prefixes;
        }
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)

    //will make the command work with his original name and alieses
    let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));

    if(commands) commands.run(Client, message, args, prefix);
 

xp(message)
    if(message.content.startsWith(`${prefix}rank`)) {
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 100 + 100 // 100 + 200 + 300
    const rankcard = new Canvacord.Rank()
    .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#aa85ce", "COLOR")
        .setOverlay("#ffffff0.0")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", "https://i2.wp.com/files.123freevectors.com/wp-content/original/157308-abstract-purple-and-white-background-design.jpg?w=800&q=95")
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }

    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 5) + 5;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 100;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Congrats ${message.author}, you leveled up, you are now level ${newLevel}`)
        }
    }
    

})
    

// Login To Discord with your app's Token
Client.login(process.env.DISCORD_TOKEN);