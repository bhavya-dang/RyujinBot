// Host
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Calling the Packages and Files
const Discord = require("discord.js");
const moment = require('moment');
const fs = require("fs");
let bot = new Discord.Client();
const prefix = "g@";
bot.Footer = "DONDAKE!!";
bot.commands = new Discord.Collection();

let cooldown = new Set();
let cdSeconds = 5;



// Ready event
bot.on('ready', () => {
console.log(`[${moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: System booting up...\n[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: All commands loaded.\n[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: 4 events ready.`);
setTimeout(() => {
console.log(`[${moment(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${bot.user.username}]: Successfully booted.`)
}, 2000);

// Bot Status
function botStatus() {
  let status = [
    `my default prefix ${prefix}.`,
    `with Tsukuyo`,
    `with ${bot.users.size} users.`
  ];
  let rstatus = Math.floor(Math.random() * status.length);
  bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        
};
  setInterval(botStatus, 20000)
});
// Message event
bot.on("message", async message => {
	if(message.author.bot) return undefined;
  if(!message.content.startsWith(prefix)) return;
	if(message.channel.type === 'dm') return;
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
  message.prefix = prefix;
  
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.channel.send(`**Please wait for ${cdSeconds} seconds! [RATELIMITED]**`);
  }
    
  if(!message.member.hasPermission("ADMINISTRATOR")){
  cooldown.add(message.author.id);
  }
  
  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdSeconds * 1000);
// Command Handler
try{
let commandFile = require(`./commands/${cmd}.js`);
commandFile.run(bot, message, args)
}catch(err){
console.log(`${err.stack}`)
}
console.log(`[${moment.utc(new Date()).format("dddd, MMMM Do YYYY, HH:mm:ss")}] [${message.author.tag}]: Command: "${cmd}" [${message.guild.name}]`);
});

bot.on("guildMemberAdd", async member => {
    const botRole = member.guild.roles.find(`name`, "The Cardinals");
    const memberRole = member.guild.roles.find(`name`, "Pariah");
    
    if(member.user.bot){ member.addRole(botRole); } else{ member.addRole(memberRole); };

    let joinEmbed = new Discord.RichEmbed()
	  .setColor(0x9acd32)
	  .setAuthor(`${member.displayName}, has joined ${member.guild.name}.`, member.user.displayAvatarURL)
	  .setTimestamp()
	  .setFooter(`User Joined | ${member.guild.memberCount} Members`);
  
    // let image = await Manager.API.welcome("anime", member.user.bot, member.user.displayAvatarURL,          member.user.tag,`${member.guild.name}#${member.guild.memberCount}`);
    //  logChannel.send({ files: [{ attachment: image, name: 'welcome.jpg' }] });
    
  
    // let bots = member.guild.members.filter(mem => mem.user.bot).size;
    let users = member.guild.members.filter(mem => !mem.user.bot).size;
    // let members = member.guild.memberCount;
  
    member.guild.channels.get("709648535942856773").setName(`Member Count: ${users}`);
});

bot.on("guildMemberRemove", async member => {
	  let leaveEmbed = new Discord.RichEmbed()
	  .setColor(0xe26346)
	  .setAuthor(`${member.displayName}, has left ${member.guild.name}.`, member.user.displayAvatarURL)
	  .setTimestamp()
	  .setFooter(`User Left | ${member.guild.memberCount} Members`)
    
     //    let image = await Manager.API.goodbye("anime", member.user.bot, member.user.displayAvatarURL,          member.user.tag,`${member.guild.name}#${member.guild.memberCount}`);
     // logChannel.send({ files: [{ attachment: image, name: 'goodbye.jpg' }] });
    
//     let bots = member.guild.members.filter(mem => mem.user.bot).size;
    let users = member.guild.members.filter(mem => mem.user.bot).size;
    let members = member.guild.members.size;
  
    member.guild.channels.get("709648571410153532").setName(`Bot Count: ${users}`);
});



// Beast Login:
	bot.login(process.env.TOKEN);