const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (bot, message, args, db) => {
  //     let prefixArgs = args[0]
  //     let noargsembed = new Discord.RichEmbed()
  //     .setFooter("Please specify a single character arguement.")
  //     .setTimestamp(moment.utc().format())
  //     .setColor("#ffe66b")
  //     if(!prefixArgs) return message.channel.send(noargsembed);

  //     // let lengthembed = new Discord.RichEmbed()
  //     // .setFooter("Maximum prefix length should be =< 10.")
  //     // .setTimestamp(moment.utc().format())
  //     // .setColor("#ffe66b")
  //     // if(prefixArgs.length > 10) return message.channel.send(lengthembed);

  //     if(prefixArgs){
  //         db.collection("guilds").doc(message.guild.id).update({
  //             "prefix": prefixArgs
  //         }).then(() => {
  //             let embed = new Discord.RichEmbed()
  //             .setDescription(`Prefix updated to: \`${prefixArgs}\` for Guild: \`[${message.guild.name}]\``)
  //             .setTimestamp(moment.utc().format())
  //             .setColor("#ffe66b")
  //             message.channel.send(embed)

  //             let reportEmbed = new Discord.RichEmbed()
  //             .setTitle(`Prefix Update`)
  //             .setThumbnail(message.guild.iconURL)
  //             .addField("New Prefix:", `\`${prefixArgs}\``)
  //             .addField("Guild Name:", `\`${message.guild.name}\``)
  //             .addField("Guild ID:", `\`${message.guild.id}\``)
  //             .addField("Guild Owner:", `\`${message.guild.owner.user.tag}\``)
  //             .setTimestamp(moment.utc().format())
  //             .setFooter("Ryujin Update Logs", bot.user.displayAvatarURL)
  //             .setColor("#ffe66b")
  //             return bot.channels.get("716949593195282433").send(reportEmbed)
  //         })
  //     }
  let embed = new Discord.RichEmbed()
    .setTitle(`Firebase Firestore Issue`)
    .setThumbnail(message.guild.iconURL)
    .setDescription("All prefix related commands are disabled for now.")
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b");
  message.channel.send(embed);
};

module.exports.help = {
  name: "setprefix",
};
