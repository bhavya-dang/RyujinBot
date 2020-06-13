const Discord = require("discord.js"),
  moment = require("moment");
const mongoose = require("mongoose");
const db = require("../keys.js").MongoURI;
const Warn = require("../models/Warn");

module.exports.run = async (bot, message, args) => {
  // MongoDB Connection
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
  let modChannel;
  await message.delete();

  let data = await Guild.findOne({
    guildId: message.guild.id,
  });
  if (data) {
    modChannel = data.modChannel;
  }
  if (data.modChannel === "None ")
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          "You have not specified a mod channel! Please set one using `set modChannel <channelmention>!`"
        )
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );

  let wUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (wUser.id === message.author.id)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You can't warn yourself!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (!wUser)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("Can't find user!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let wReason = args.join(" ").trim().slice(22);
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to do so!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (wUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to warn them")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let warnEmbed = new Discord.RichEmbed()
    .setTitle("Warn")
    .setColor("#bc0000")
    .setThumbnail(wUser.user.displayAvatarURL)
    .addField("User", `\`${wUser.user.tag}\``)
    .addField("Moderator", `\`${message.author.tag}\``)
    .addField("Reason", `\`${wReason ? wReason : "None."}\``)
    .addField(
      "Time",
      `\`${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}\``
    )
    .setFooter("Developed by Sync#0666", bot.user.displayAvatarURL);
  let logChannel = message.guild.channels.get(modChannel);
  if (!logChannel)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          "Can't find mod-log channel! Use `set modChannel <channelmention> to set one!`"
        )
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  logChannel.send(warnEmbed);

  const newWarn = new Warn({
    wUserName: wUser.user.tag,
    wUserID: wUser.id,
    moderator: message.author.tag,
    reason: wReason,
    date_time: moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"),
  });

  newWarn.save().then((res) => console.log(res));
  message.channel
    .send(
      new Discord.RichEmbed()
        .setDescription(`Member has been warned!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    )
    .then((msg) => msg.delete(7500));
};

module.exports.help = {
  name: "warn",
};
