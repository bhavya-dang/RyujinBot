const Discord = require("discord.js");
const moment = require("moment");
const Guild = require("../models/Guild");
module.exports.run = async (bot, message, args) => {
  let prefix;
  let modChannel;
  let muteRole;
  let autoRole;
  let logChannel;

  let data = await Guild.findOne({ guildId: message.guild.id });
  if (data) {
    prefix = data.prefix;
    modChannel = message.guild.channels.get(data.modChannel);
    logChannel = message.guild.channels.get(data.logChannel);
    autoRole = message.guild.roles.get(data.autoRole);
    muteRole = message.guild.roles.get(data.muteRole);
    let embed = new Discord.RichEmbed()
      .setTitle(`Configuration for ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL)
      .addField("Prefix:", `${prefix}`, true)
      .addField(
        "Mod Channel:",
        `${modChannel === undefined ? "Not Set." : modChannel}`
      )
      .addField(
        "Log (Welcome/Leave) Channel:",
        `${logChannel === undefined ? "Not Set." : logChannel}`
      )
      .addField(
        "Auto Role",
        `${autoRole === undefined ? "Not Set." : autoRole}`
      )
      .addField(
        "Mute Role",
        `${muteRole === undefined ? "Not Set." : muteRole}`
      )
      .setTimestamp(moment.utc().format())
      .setColor("#ffe66b");
    message.channel.send(embed);
  } else {
    let embed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .setThumbnail(message.guild.iconURL)
      .setDescription("Server not found!")
      .setTimestamp(moment.utc().format())
      .setColor("#ffe66b");
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "config",
};
