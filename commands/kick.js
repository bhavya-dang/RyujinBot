//Calling Packages

const Discord = require("discord.js"),
  fs = require("fs"),
  moment = require("moment");
const mongoose = require("mongoose");
const db = require("../keys.js").MongoURI;
const Kick = require("../models/Kick");

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
    if (data.modChannel === "None")
      return message.channel.send(
        new Discord.RichEmbed()
          .setTitle("**ERROR**")
          .setDescription(
            "You have not specified a mod channel! Please set one using `set modChannel <channelmention>!`"
          )
          .setTimestamp(moment.utc().format())
          .setColor("#ffe66b")
      );
  ;

  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (kUser.id === message.author.id)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You can't kick yourself!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (!kUser)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("Can't find user!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let kReason = args.join(" ").trim().slice(22);
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to do so!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (kUser.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to kick them")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let kickEmbed = new Discord.RichEmbed()
    .setTitle("Kick")
    .setColor("#bc0000")
    .setThumbnail(kUser.user.displayAvatarURL)
    .addField("User", `\`${kUser.user.tag}\``)
    .addField("Moderator", `\`${message.author.tag}\``)
    .addField("Reason", `\`${kReason ? kReason : "None."}\``)
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
  kUser.kick(kReason).then(() => logChannel.send(kickEmbed));
  const newKick = new Kick({
    kUserName: kUser.user.tag,
    kUserID: kUser.id,
    moderator: message.author.tag,
    reason: kReason,
    date_time: moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss"),
  });

  newKick.save().then((res) => console.log(res));
  message.channel
    .send(
      new Discord.RichEmbed()
        .setDescription(`Member has been kicked!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    )
    .then((msg) => msg.delete(7500));
};

module.exports.help = {
  name: "kick",
};
