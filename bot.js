// Host
const http = require("http");
const express = require("express");
const app = express();
//require("dotenv/config"); //for development
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

// app.listen(process.env.PORT);
// setInterval(() => {
//   http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 280000);

// Calling the Packages and Files
const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
let bot = new Discord.Client();
let prefix;
bot.commands = new Discord.Collection();

let cooldown = new Set();
let cdSeconds = 5;

// Sending server count to DBL
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot);

// Optional events
dbl.on("posted", () => {
  console.log("Server count posted!");
});

// bot.Footer = `Developed by ${bot.users.get("414111663076147201").tag}`;

// Firebase Setup
// const firebase = require("firebase");
// const FieldValue = require("firebase-admin").firestore.FieldValue;
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccount.json");
// const key = process.env.FIREBASE_PRIVATE_KEY;
// admin.initializeApp({
//   credential: admin.credential.cert({
//     private_key: key.replace(/\\n/g, "\n"),
//     client_email: process.env.CLIENT_EMAIL,
//     project_id: process.env.PROJECT_ID,
//   }),
//   databaseURL: "https://ryujinbot-8c6e8.firebaseio.com",
// });

// const db = admin.firestore();

//MongoDB Setup
const mongoose = require("mongoose"),
  db = require("./keys").MongoURI,
  Guild = require("./models/Guild");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//VultrexDB Setup
const { VultrexDB } = require("vultrex.db");
const vdb = new VultrexDB({
  provider: "sqlite",
  table: "main",
  fileName: "main",
});

vdb.connect().then(() => {
  console.log("VultrexDB Connected!");
  console.log(vdb);
  bot.db = vdb;
});
bot.randomColor = Math.floor(Math.random() * 16777215).toString(16);
// Ready event
bot.on("ready", () => {
  // setInterval(() => {
  //   dbl.postStats(bot.guilds.size);
  // }, 1800000);

  console.log(
    `[${moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${
      bot.user.username
    }]: System booting up...\n[${moment
      .utc(new Date())
      .format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${
      bot.user.username
    }]: All commands loaded.\n[${moment
      .utc(new Date())
      .format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${
      bot.user.username
    }]: 4 events ready.`
  );
  setTimeout(() => {
    console.log(
      `[${moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${
        bot.user.username
      }]: Successfully booted.`
    );
  }, 2000);

  // Bot Status
  function botStatus() {
    let status = [
      `mention me!`,
      `tweaked by Sync#0666`,
      `with ${bot.guilds
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()} users.`,
    ];
    let rstatus = Math.floor(Math.random() * status.length);
    bot.user.setActivity(status[rstatus], {
      type: "STREAMING",
    });
  }
  setInterval(botStatus, 20000);
});
// Message event
bot.on("message", async (message) => {
  if (message.author.bot) return undefined;
  const levelInfo = await bot.db.get(
    `level-${message.guild.id}-${message.author.id}`,
    {
      level: 1,
      xp: 0,
      totalXp: 0,
    }
  );

  let generatedXp = Math.floor(Math.random() * 16);
  levelInfo.xp += generatedXp;
  levelInfo.totalXp += generatedXp;

  if (levelInfo.xp >= levelInfo.level * 40) {
    levelInfo.level++;
    levelInfo.xp = 0;
    if (message.guild.id !== "638036514214772737") {
      message.channel
        .send(
          new Discord.RichEmbed()
            .setTitle("✶ New Level! ✶")
            .setAuthor(message.author.tag)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp(moment.utc().format())
            .setColor(`#${bot.randomColor}`)
            .setDescription(
              `You are now level \`${levelInfo.level}\` ${message.author}!`
            )
            .setFooter("Ryu Leveling System")
        )
        .then((msg) => msg.delete(4000));
    } else return undefined;
  }
  await bot.db.set(`level-${message.guild.id}-${message.author.id}`, levelInfo);
  let data = await Guild.findOne({
    guildId: message.guild.id,
  });
  if (data) {
    prefix = data.prefix;
  } else {
    prefix = "r@";
  }

  if (
    message.content === `<@!${bot.user.id}>` ||
    message.content === `<@${bot.user.id}>`
  ) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("✶ Ryujin Bot ✶")
        .setThumbnail(bot.user.displayAvatarURL)
        .setTimestamp(moment.utc().format())
        .setColor("#ff1453")
        .setDescription(
          `\u2022\ **Changelog** \u2022\ \n\n- Integrated Leveling System\n \`rank (for rank card)\` | \`lbd (for leaderboard)\`\n\n- Integrated Moderation System\n \`ban\` | \`kick\` | \`warn\` | \`mute\` | \`unmute\`\n\n- Integrated Logging System\n\n- Custom Configuration\n\`set prefix/modChannel/autoRole/logChannel/muteRole\` | \`config\`\n\n- Added website! It will look really bad on mobile though, since I haven't made it responsive yet :/\n\nNote: If you don't want to use auto-role or moderation commands, do not use the \`set\` command!\n`
        )
        .addField("Server Prefix:", `\`${prefix}\``, true)
        .addField("Server Configuration:", `\`Do ${prefix}config\``, true)
        .addField("Commands List:", `\`${prefix}help\``, true)
        .addField("Links", `[\`Website\`](https://ryudashboard.herokuapp.com/) | [\`Donate!\`](https://www.patreon.com/synxc) | [\`PayPal\`](https://www.paypal.me/syncox) | [\`Support Server!\`](https://discord.gg/btKWdJ7)`, true)
        .setFooter("Developed By Sync#0666")
    );
  } else if (!message.content.startsWith(prefix)) return;

  if (message.channel.type === "dm") return;
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  message.prefix = prefix;

  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**RATELIMITED**")
        .setDescription(
          `**Please wait for **${cdSeconds}** seconds before trying again!**`
        )
        .setTimestamp(moment.utc().format())
    );
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, cdSeconds * 1000);

  // Command Handler
  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(bot, message, args);
  } catch (err) {
    console.log(`${err.stack}`);
  }
  console.log(
    `[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${
      message.author.tag
    }]: Command: "${cmd}" [${message.guild.name}] [#${message.channel.name}]`
  );
});

let autoRole;
let logChannel;
bot.on("guildMemberAdd", async (member) => {
  let data = await Guild.findOne({
    guildId: member.guild.id,
  });
  if (
    data.autoRole === undefined &&
    !member.guild.member(bot.user).hasPermission("MANAGE_ROLES")
  )
    return;
  if (
    data.autoRole ||
    !member.guild.member(bot.user).hasPermission("MANAGE_ROLES")
  )
    return;
  if (
    data.autoRole === undefined ||
    member.guild.member(bot.user).hasPermission("MANAGE_ROLES")
  )
    return;
  if (data) {
    autoRole = data.autoRole;
    logChannel = data.logChannel;
  }

  const memberRole = member.guild.roles.get(autoRole);

  try {
    if (!member.user.bot) {
      if (bot.user.hasPermission("MANAGE_MEMBERS"))
        return member.addRole(memberRole);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    if (typeof data.logChannel != "undefined" || data.logChannel == "") {
    let wChannel = member.guild.channels.get(logChannel);
    let joinEmbed = new Discord.RichEmbed()
      .setColor(0x9acd32)
      .setAuthor(
        `${member.displayName}, has joined ${member.guild.name}.`,
        member.user.displayAvatarURL
      )
      .setTimestamp(moment.utc().format())
      .setFooter(`User Joined | ${member.guild.memberCount} Members`);
    wChannel.send(joinEmbed);
   } else return;
  } catch(err) {
    console.log(err)
  }
  let bots = member.guild.members.filter((mem) => mem.user.bot).size;
  let users = member.guild.members.filter((mem) => !mem.user.bot).size;
  if (member.guild.id === "714798049398095882") {
    member.guild.channels
      .get("714798049888829452")
      .setName(`Member Count: ${users}`);
    member.guild.channels
      .get("714798049888829453")
      .setName(`Bot Count: ${bots}`);
  } else return;
});

bot.on("guildMemberRemove", async (member) => {
  let data = await Guild.findOne({
    guildId: member.guild.id,
  });

  if (data) {
    logChannel = data.logChannel;
  }
  try {
      if (typeof data.logChannel != "undefined" || data.logChannel == "") {
    let lChannel = member.guild.channels.get(logChannel);
    let leaveEmbed = new Discord.RichEmbed()
      .setColor(0xe26346)
      .setAuthor(
        `${member.displayName}, has left ${member.guild.name}.`,
        member.user.displayAvatarURL
      )
      .setTimestamp()
      .setFooter(`User Left | ${member.guild.memberCount} Members`);
    lChannel.send(leaveEmbed);
  } else return;
  } catch(err) {
    console.log(err)
  }
  if (member.guild.id === "714798049398095882") {
    let bots = member.guild.members.filter((mem) => mem.user.bot).size;
    let users = member.guild.members.filter((mem) => !mem.user.bot).size;

    member.guild.channels
      .get("714798049888829452")
      .setName(`Member Count: ${users}`);
    member.guild.channels
      .get("714798049888829453")
      .setName(`Bot Count: ${bots}`);
  } else return;
});
bot.on("guildCreate", async (guild) => {
  let guildJoinEmbed = new Discord.RichEmbed()
    .setTitle("Joined Guild!")
    .setThumbnail(guild.iconURL)
    .addField("Guild Name:", `\`${guild.name}\``)
    .addField("Guild ID:", `\`${guild.id}\``)
    .addField("Guild Owner:", `\`${guild.owner.user.tag}\``)
    .addField("Guild OwnerID:", `\`${guild.ownerID}\``)
    .addField("Member Count:", `\`${guild.memberCount}\``)
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b");
  bot.channels.get("717017858273574914").send(guildJoinEmbed);

  const newGuild = new Guild({
    guildId: guild.id,
    guildName: guild.name,
    guildOwner: guild.owner.user.tag,
    guildOwnerID: guild.ownerID,
    memberCount: guild.memberCount,
    prefix: "r@",
    modChannel: "None",
    logChannel: "None",
    autoRole: "None",
    muteRole: "None",
    time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
  });

  newGuild
    .save()
    .then((res) =>
      console.log(res, `[${guild.id}][${guild.name}] Query Deleted`)
    );
});

bot.on("guildDelete", async (guild) => {
  let guildLeaveEmbed = new Discord.RichEmbed()
    .setTitle("Left Guild!")
    .setThumbnail(guild.iconURL)
    .addField("Guild Name:", `\`${guild.name}\``)
    .addField("Guild ID:", `\`${guild.id}\``)
    .addField("Guild Owner:", `\`${guild.owner.user.tag}\``)
    .addField("Guild OwnerID:", `\`${guild.ownerID}\``)
    .addField("Member Count:", `\`${guild.memberCount}\``)
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b");
  bot.channels.get("717017858273574914").send(guildLeaveEmbed);

  Guild.deleteOne({
    guildId: guild.id,
  }).then(() => console.log(`[${guild.id}][${guild.name}] Query Deleted`));
});
// Ryujin Login:
bot.login(process.env.TOKEN);
