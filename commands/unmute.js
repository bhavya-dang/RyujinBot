const Discord = require("discord.js"),
  fs = require("fs"),
  moment = require("moment"),
  Guild = require("../models/Guild");

module.exports.run = async (bot, message, args) => {
  await message.delete();

  let modChannel;
  let muteRole;
  let data = await Guild.findOne({
    guildId: message.guild.id,
  });
  if (data) {
    modChannel = data.modChannel;
    muteRole = data.muteRole;
  }
  if ((data.modChannel && data.muteRole === "None") || data.muteRole === "None")
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          "You have not specified a mod channel and mute role! Please set them using\n`set modChannel <channelmention>!` | `set muteRole <rolemention>!`"
        )
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let mUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!mUser)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("Can't find user!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let mReason = args.join(" ").trim().slice(22);
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
  const mRole = message.guild.roles.get(muteRole);
  // if (!mRole)
  //   return message.channel.send(
  //     new Discord.RichEmbed()
  //       .setTitle("**ERROR**")
  //       .setDescription("`Muted` role does not exist! Please create one!")
  //       .setTimestamp(moment.utc().format())
  //       .setColor("#ffe66b")
  //   );

  if (mUser.roles.has(mRole))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("This person is not muted!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );

  let embed = new Discord.RichEmbed()
    .setTitle("Unute")
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
  let logChannel = message.guild.channels.get(modChannel);
  logChannel.send(embed).then(() => mUser.removeRole(mRole));
  if (!logChannel)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          "Can't find mod-log channel! Please sepcify one using the set command!"
        )
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  message.channel
    .send(
      new Discord.RichEmbed()
        .setDescription(`Member has been umuted!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    )
    .then((msg) => msg.delete(7500));
};

module.exports.help = {
  name: "unmute",
};
