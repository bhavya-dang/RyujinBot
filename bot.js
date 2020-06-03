// Host
const http = require("http");
const express = require("express");
const app = express();

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
//require("dotenv/config"); //for development

// Sending server count to DBL
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot);

// Optional events
dbl.on("posted", () => {
  console.log("Server count posted!");
});

// bot.Footer = `Developed by ${bot.users.get("414111663076147201").tag}`;
bot.commands = new Discord.Collection();

let cooldown = new Set();
let cdSeconds = 5;

// Firebase Setup
const firebase = require("firebase");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccount.json");
const key = process.env.FIREBASE_PRIVATE_KEY;
admin.initializeApp({
  credential: admin.credential.cert({
    private_key: key.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    project_id: process.env.PROJECT_ID,
  }),
  databaseURL: "https://ryujinbot-8c6e8.firebaseio.com",
});

const db = admin.firestore();

// Ready event
bot.on("ready", () => {
  setInterval(() => {
    dbl.postStats(bot.guilds.size);
  }, 1800000);

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
      `with ${bot.users.size} users.`,
    ];
    let rstatus = Math.floor(Math.random() * status.length);
    bot.user.setActivity(status[rstatus], { type: "STREAMING" });
  }
  setInterval(botStatus, 20000);
});
// Message event
bot.on("message", async (message) => {
  db.collection("guilds")
    .doc(message.guild.id)
    .get()
    .then((q) => {
      if (q.exists) {
        prefix = q.data().prefix;
      }
    })
    .then(() => {
      if (message.author.bot) return undefined;
      if (
        message.content === "<@!533902737398824961>" ||
        message.content === "<@533902737398824961>"
      ) {
        return message.channel.send(
          new Discord.RichEmbed()
            .setTitle("✶ Ryujin Bot ✶")
            .setThumbnail(bot.user.displayAvatarURL)
            .setTimestamp(moment.utc().format())
            .setColor("#ff1453")
            .setDescription(
              `\u2022\ **Changelog** \u2022\ \n- Added four commands: \`covid\`, \`github\`, \`animequotes\`, \`quote\`\n- Added \`README.md\`\n- Fixed music system.\n- Added mention response (bot will respond to mention in chat)\n- Integrated Firebase and MongoDB databaseS\n- Use \`setprefix\` to set custom prefix (default: r@)\n- Use \`config\` to check server configuration\n- Added moderation system [UNDER DEVELOPMENT]\n\n\u2022\ **Coming Soon** \u2022\ \n- Moderation: Commands to be migrated from older bot\n- Setup feature: Set custom welcome-leave channels and autorole\n- Leveling System\n- \nLiked the bot? Join the server [\`here!\`](https://discord.gg/btKWdJ7), or contact me to be a Tester!\nThe bot is constantly in development. So you might see two instances (commands running twice) sometimes. Sorry for the inconvinience!`
            )
            .addField("Server Prefix:", `\`${prefix}\``, true)
            .addField("Server Configuration:", `\`Do ${prefix}config\``, true)
            .addField("Commands Help:", `\`Do ${prefix}help <category>\``, true)
            .addField("Commands List:", `\`Do ${prefix}help\``, true)
            .setFooter("» Sync#0666")
        );
      } else if (!message.content.startsWith(prefix)) return;
      if (message.channel.type === "dm") return;
      let args = message.content.slice(prefix.length).trim().split(" ");
      let cmd = args.shift().toLowerCase();
      message.prefix = prefix;

      if (cooldown.has(message.author.id)) {
        message.delete();
        return message.channel.send(
          `**Please wait for ${cdSeconds} seconds! [RATELIMITED]**`
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
        commandFile.run(bot, message, args, db);
      } catch (err) {
        console.log(`${err.stack}`);
      }
      console.log(
        `[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${
          message.author.tag
        }]: Command: "${cmd}" [${message.guild.name}] [#${
          message.channel.name
        }]`
      );
    });
});

bot.on("guildMemberAdd", async (member) => {
  if (member.guild.id === "714798049398095882") {
    const botRole = member.guild.roles.find((r) => r.name === "The Cardinals");
    const memberRole = member.guild.roles.find((m) => m.name === "Pariah");

    if (member.user.bot) {
      member.addRole(botRole);
    } else {
      member.addRole(memberRole);
    }
    let wChannel = bot.channels.get("714798050291482669");
    let joinEmbed = new Discord.RichEmbed()
      .setColor(0x9acd32)
      .setAuthor(
        `${member.displayName}, has joined ${member.guild.name}.`,
        member.user.displayAvatarURL
      )
      .setTimestamp()
      .setFooter(`User Joined | ${member.guild.memberCount} Members`);
    wChannel.send(joinEmbed);
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

bot.on("guildMemberRemove", async (member) => {
  if (member.guild.id === "714798049398095882") {
    let lChannel = bot.channels.get("714798050291482669");
    let leaveEmbed = new Discord.RichEmbed()
      .setColor(0xe26346)
      .setAuthor(
        `${member.displayName}, has left ${member.guild.name}.`,
        member.user.displayAvatarURL
      )
      .setTimestamp()
      .setFooter(`User Left | ${member.guild.memberCount} Members`);
    lChannel.send(leaveEmbed);

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

  db.collection("guilds")
    .doc(guild.id)
    .set({
      guildId: guild.id,
      guildName: guild.name,
      guildOwner: guild.owner.user.tag,
      guildOwnerID: guild.ownerID,
      memberCount: guild.users.size,
      prefix: "r@",
    })
    .then(() => console.log(`[${guild.id}][${guild.name}] Document Created`));
});

bot.on("guildDelete", async (guild) => {
  let guildLeaveEmbed = new Discord.RichEmbed()
    .setTitle("Left Guild!")
    .setThumbnail(guild.iconURL)
    .addField("Guild Name:", `\`${guild.name}\``)
    .addField("Guild ID:", `\`${guild.id}\``)
    .addField("Guild Owner:", `\`${guild.owner.user.tag}\``)
    .addField("Guild OwnerID:", `\`${guild.ownerID}\``)
    .addField("Member Count:", `\`${guild.users.size}\``)
    .setTimestamp(moment.utc().format())
    .setColor("#ffe66b");
  bot.channels.get("717017858273574914").send(guildLeaveEmbed);
  db.collection("guilds")
    .doc(guild.id)
    .delete()
    .then(() => console.log(`[${guild.id}][${guild.name}] Document Deleted`));
});
// Ryujin Login:
bot.login(process.env.TOKEN);
