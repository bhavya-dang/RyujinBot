const Discord = require("discord.js");
const moment = require('moment');
module.exports.run = async (bot, message, args) => {

    // let prefix;
    // let guildName;
    // let guildID;

    // let data = await db.collection("guilds").doc(message.guild.id).get();

    //     if(data.exists){
    //         prefix = data.data().prefix;
    //         guildID = data.data().guildID;
    //         guildName = data.data().guildName;
        

    //     let embed = new Discord.RichEmbed()
    //     .setTitle(`Configuration for ${bot.user.username}`)
    //     .setThumbnail(message.guild.iconURL)
    //     .addField("Prefix:", `\`${prefix}\``, true)
    //     .addField("Guild Name:", `\`${message.guild.name}\``)
    //     .addField("Guild ID:", `\`${message.guild.id}\``)
    //     .setTimestamp(moment.utc().format())
    //     .setColor("#ffe66b")
    //     message.channel.send(embed)
    //     }
    let embed = new Discord.RichEmbed()
        .setTitle(`Firebase Firestore Issue`)
        .setThumbnail(message.guild.iconURL)
        .setDescription("All prefix related commands are disabled for now.")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
        message.channel.send(embed)
}


module.exports.help = {
    name: "config"
}