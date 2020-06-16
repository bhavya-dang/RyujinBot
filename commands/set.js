const Discord = require("discord.js");
const moment = require("moment");
const Guild = require("../models/Guild");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`**ERROR**`)
        .setDescription(
          "You do not have the required permissions `[ADMINISTRATOR]`."
        )
        .setThumbnail(message.guild.iconURL)
        .setFooter("Ryu Server Confirguration")
        .setColor("#f57e00")
        .setTimestamp(moment.utc().format())
        .setFooter("Ryu Server Configuration")
    );
  if (!message.guild.member(bot.user).hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`**ERROR**`)
        .setDescription(
          "Bot does not have the required permissions `[ADMINISTRATOR]`."
        )
        .setThumbnail(message.guild.iconURL)
        .setFooter("Ryu Server Confirguration")
        .setColor("#f57e00")
        .setTimestamp(moment.utc().format())
        .setFooter("Ryu Server Configuration")
    );
  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle(`**ERROR**`)
        .setDescription(
          "Please specify a configuration paramter!\n`prefix` | `modChannel` | `logChannel` | `autoRole` | `muteRole`"
        )
        .setThumbnail(message.guild.iconURL)
        .setFooter("Ryu Server Confirguration")
        .setColor("#f57e00")
        .setTimestamp(moment.utc().format())
        .setFooter("Ryu Server Configuration")
    );
  let data = await Guild.findOne({ guildId: message.guild.id });
  if (data) {
    if (args[0] === "prefix") {
      await data.updateOne({
        prefix: args[1],
      });
      if (!args[1])
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("**ERROR**")
            .setDescription(
              "Please specify a valid prefix!\nUsage: `<cuurent prefix>set prefix <new prefix>`"
            )
            .setTimestamp(moment.utc().format())
            .setColor("#ffe66b")
        );
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`Prefix Configuration for ${message.guild.name}`)
          .setDescription(`Prefix changed to ${args[1]}`)
          .setThumbnail(message.guild.iconURL)
          .setColor("#f57e00")
          .setTimestamp(moment.utc().format())
          .setFooter("Ryu Server Configuration")
      );
    } else if (args[0] === "modChannel") {
      let channel = message.guild.channels.get(
        message.mentions.channels.first().id
      );
      if (!channel || !message.guild.channels.some((c) => c.id === channel.id))
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("**ERROR**")
            .setDescription(
              "Please mention a valid channel!\nUsage: `<prefix>set modChannel <mention channel>`"
            )
            .setTimestamp(moment.utc().format())
            .setColor("#ffe66b")
        );
      await data.updateOne({
        modChannel: channel.id,
      });
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`Mod-Channel Configuration for ${message.guild.name}`)
          .setDescription(
            `Mod-Channel set to ${channel}!\nPlease provide required permissions to the bot to use mod commands.`
          )
          .setThumbnail(message.guild.iconURL)
          .setColor("#f57e00")
          .setTimestamp(moment.utc().format())
          .setFooter("Ryu Server Configuration")
      );
    } else if (args[0] === "logChannel") {
      let channel = message.guild.channels.get(
        message.mentions.channels.first().id
      );
      if (!channel || !message.guild.channels.some((r) => r.id === channel.id))
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("**ERROR**")
            .setDescription(
              "Please mention a valid channel!\nUsage: `<prefix>set logChannel <mention channel>`"
            )
            .setTimestamp(moment.utc().format())
            .setColor("#ffe66b")
        );
      await data.updateOne({
        logChannel: channel.id,
      });
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`Log-Channel Configuration for ${message.guild.name}`)
          .setDescription(`Log-Channel set to ${channel}`)
          .setThumbnail(message.guild.iconURL)
          .setColor("#f57e00")
          .setTimestamp(moment.utc().format())
          .setFooter("Ryu Server Configuration")
      );
    } else if (args[0] === "autoRole") {
      await message.delete();
      let role = message.guild.roles.get(message.mentions.roles.first().id);
      if (!role || !message.guild.roles.some((r) => r.id === role.id))
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("**ERROR**")
            .setDescription(
              "Please specify a valid role!\nUsage: `<prefix>set autoRole <mention role>`\nPlease provide required permissions to the bot to add a role."
            )
            .setTimestamp(moment.utc().format())
            .setColor("#ffe66b")
        );

      await data.updateOne({
        autoRole: role.id,
      });
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`Auto Role Configuration for ${message.guild.name}`)
          .setDescription(`Auto Role set to ${role}`)
          .setThumbnail(message.guild.iconURL)
          .setColor("#f57e00")
          .setTimestamp(moment.utc().format())
          .setFooter("Ryu Server Configuration")
      );
    } else if (args[0] === "muteRole") {
      await message.delete();
      let role = message.guild.roles.get(message.mentions.roles.first().id);
      if (!role || !message.guild.roles.some((r) => r.id === role.id))
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("**ERROR**")
            .setDescription(
              "Please specify a valid role!\nUsage: `<prefix>set muteRole <mention role>`\nPlease provide required permissions to the bot to use mod commands."
            )
            .setTimestamp(moment.utc().format())
            .setColor("#ffe66b")
        );

      await data.updateOne({
        muteRole: role.id,
      });
      message.channel.send(
        new Discord.RichEmbed()
          .setTitle(`Mute Role Configuration for ${message.guild.name}`)
          .setDescription(`Mute Role set to ${role}`)
          .setThumbnail(message.guild.iconURL)
          .setColor("#f57e00")
          .setTimestamp(moment.utc().format())
          .setFooter("Ryu Server Configuration")
      );
    }
  }
};

module.exports.help = {
  name: "set",
};
