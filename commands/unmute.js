const Discord = require("discord.js"),
  fs = require("fs"),
  moment = require("moment");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if (message.guild.id !== "714798049398095882")
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          `This command is still in development. Only accessible in the [\`support server!\`](https://discord.gg/btKWdJ)`
        )
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let mUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (mUser.id === message.author.id)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You can't mute yourself!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (!mUser)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("Can't find user!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let mRole = message.guild.roles.find((r) => r.name === "Muted");
  if (!mRole)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("`Muted` role does not exist! Please create one!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );

  if (!mUser.roles.has(mRole.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("This person is not muted!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );

  let mReason = args.join(" ").slice(22);
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to do so!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (mUser.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to unmute them")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let embed = new Discord.RichEmbed()
    .setTitle("Mute")
    .setColor("#bc0000")
    .setThumbnail(mUser.user.displayAvatarURL)
    .addField("User", `\`${mUser.user.tag}\``)
    .addField("Moderator", `\`${message.author.tag}\``)
    .addField("Reason", `\`${mReason ? mReason : "None."}\``)
    .addField(
      "Time",
      `\`${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}\``
    )
    .setFooter("Developed by Sync#0666", bot.user.displayAvatarURL);
  let logChannel = message.guild.channels.find((c) => c.name === "mod-log");
  logChannel.send(embed);
  if (!logChannel)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("Can't find mod-log channel!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
    message.channel
    .send(
      new Discord.RichEmbed()
        .setDescription(`Member has been unmuted!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    )
    .then((msg) => msg.delete(7500));
};

module.exports.help = {
  name: "unmute",
};
