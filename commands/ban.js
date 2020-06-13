const Discord = require("discord.js");
const moment = require("moment"),
  mongoose = require("mongoose"),
  db = require("../keys").MongoURI,
  Ban = require("../models/Ban"),
  Guild = require("../models/Guild");

module.exports.run = async (bot, message, args) => {
  //Connect to database

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
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

  let bUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (bUser.id === message.author.id)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You can't ban yourself!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (!bUser)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("Can't find user!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  let bReason = args.join(" ").trim().slice(22);
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to do so!")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (bUser.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("You don't have enough permissions to ban them")
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );

  let banEmbed = new Discord.RichEmbed()
    .setTitle("Ban")
    .setColor("#bc0000")
    .setThumbnail(bUser.user.displayAvatarURL)
    .addField("User", `\`${bUser.user.tag}\``)
    .addField("Moderator", `\`${message.author.tag}\``)
    .addField("Reason", `\`${bReason ? bReason : "None."}\``)
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
  bUser.ban(bReason).then(() => logChannel.send(banEmbed));
  message.channel
    .send(
      new Discord.RichEmbed()
        .setDescription(`Member has been banned!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    )
    .then((msg) => msg.delete(7500));

  // db.collection("bans").doc(bUser.id).set({

  // }).then(() => console.log(`[${message.guild.id}] document added`));

  //   db.collection("bans").doc(bUser.id).update({
  //     "prefix": prefixArgs
  // })

  const newBan = new Ban({
    guildId: message.guild.id,
    guildName: message.guild.name,
    bUser: bUser.user.tag,
    bUserID: bUser.id,
    moderator: message.author.tag,
    reason: bReason,
    time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  });

  newBan.save().then((res) => console.log(res));
};

module.exports.help = {
  name: "ban",
};
