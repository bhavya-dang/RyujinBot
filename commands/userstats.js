const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const ms = require('ms');
module.exports.run = async (bot, message, args) => {

  let role = message.member.roles.map(r => `${r.name}`)
  let user = message.guild.member(message.mentions.users.first() || message.author);

  let uEmbed = new Discord.RichEmbed()
  .setTitle("User Information")
  .setColor("#e0d318")
  .setThumbnail(user.user.displayAvatarURL)
  .addField("**Userame**", `\`${user.displayName}\``, true)
  .addField("**Discriminator**", `\`${user.user.discriminator}\``, true)
  .addField("**ID**", `\`${user.id}\``)
  .addField("**Bot**", `${user.bot ? "Yes" : "No"}`, true)
  .addField("**Status**",`\`${user.presence.status}\``)
  .addField("**Roles**", `${user.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
  .addField("**Playing**", `\`${user.presence.game ? `${user.presence.game.state}` : "Not playing anything."}\``)
  .addField("**Acc. Created At**", `\`${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${ms(Date.now()- message.author.createdAt, {long: true})})\``)
  .addField("**Joined At**", `\`${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} (${ms(Date.now()- message.member.joinedAt, {long: true})})\``);

  message.channel.send(uEmbed);
}

module.exports.help = {
  name: "userstats"
}



