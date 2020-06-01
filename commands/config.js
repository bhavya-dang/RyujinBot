const Discord = require("discord.js");
const moment = require('moment');
module.exports.run = async (bot, message, args, db) => {

    let prefix;
    let guildName;
    let guildID;

    db.collection("guilds").doc(message.guild.id).get().then(q => {
        if(q.exists){
            prefix = q.data().prefix;
            guildID = q.data().guildID;
            guildName = q.data().guildName;
        }
    }).then(() => {
        let embed = new Discord.RichEmbed()
        .setTitle(`Configuration for ${bot.user.username}`)
        .setThumbnail(message.guild.iconURL)
        .addField("Prefix", `\`${prefix}\``, true)
        .addField("Guild Name:", `\`${message.guild.name}\``)
        .addField("Guild ID:", `\`${message.guild.id}\``)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
        message.channel.send(embed)
    })
}


module.exports.help = {
    name: "config"
}