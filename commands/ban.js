const Discord = require("discord.js"),
moment = require("moment");

module.exports.run = async (bot, message, args, db) => {
  
    await message.delete();
  
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(bUser.id === message.author.id) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("You can't ban yourself!")
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b")
    )
    if(!bUser) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("Can't find user!")
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b"));
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("You dont't have enough permissions to do so!")
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b"))
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("You don't have enough permissions to ban them")
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b")) 

    let banEmbed = new Discord.RichEmbed()
    .setTitle("Ban")
    .setColor("#bc0000")
    .setThumbnail(bUser.user.displayAvatarURL)
    .addField("User", bUser.user.tag)
    .addField("Moderator", message.author.tag)
    .addField("Reason", `${bReason ? bReason : "None."}`)
    .addField("Time", moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"))
    .setFooter("Developed by Sync#0666", bot.user.displayAvatarURL)
    let incidentchannel = message.guild.channels.find(c => c.name === "mod-log");
    if(!incidentchannel) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("Can't find mod-log channel!")
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b"));
 
  message.channel.send(new Discord.RichEmbed()
  .setTitle("**ERROR**")
  .setDescription(`Member has been banned!`)
  .setTimestamp(moment.utc().format())
  .setColor("#ffe66b")).then(msg => msg.delete(7500));
  bUser.ban(bReason)
  incidentchannel.send(banEmbed);
  

  db.collection("bans").doc(message.guild.id).collection(bUser.id).set({
    guildId: message.guild.id,
    guildName: message.guild.name,
    bUser: bUser.user.tag,
    bUserID: bUser.id,
    moderator: message.author.tag,
    reason: reason,
    time: moment.utc().format()
  }).then(() => console.log(`[${guild.id}] document added`));
  
//   db.collection("bans").doc(bUser.id).update({
//     "prefix": prefixArgs
// })


  
};



module.exports.help = {
  name: "ban"
};