const Discord = require("discord.js");
const moment = require('moment');
const functions = require("../structures/functions");

module.exports.run = async (bot, message, args) => {
    let data = await bot.db.getAll(`level-${message.guild.id}`);
    data.sort((a, b) => b.value.totalXp - a.value.totalXp);
    data = await Promise.all(data.map(async (data, index) => {
        const user = await bot.fetchUser(data.key.split("-")[2]).catch(() => null);
        if(user) {
            return {
                tag: user.tag,
                level: data.value.level,
                xp: data.value.totalXp,
                rank: index + 1
            };
        };
    }));

    if(!data.length) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("There is no leaderboard for this server yet!")
    .setTimestamp(moment.utc().format()));

    const page = functions.pages(data, 10, args[0] || 1);
    if(!page) return message.channel.send(new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription("This page does not exist!")
    .setTimestamp(moment.utc().format()));
    
    let embed = new Discord.RichEmbed()
    .setAuthor(`Leaderboard | ${message.guild.name}`)
    .setThumbnail(message.guild.iconURL)
    .setColor("#ff1453")
    .setDescription(page.map(e => `\`${e.rank}\` | **${e.tag}** (Level: ${e.level}, XP: ${e.xp})`))
    .setFooter("Ryu Leveling System")
    .setTimestamp(moment.utc().format());
    message.channel.send(embed)

};

module.exports.help = {
    name: "lbd"
}