const Discord = require(`discord.js`);
const moment = require(`moment`);
let prefix = "r@";

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(`Help | ${message.guild.name}`, message.guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .setDescription("Please note all Moderation commands require two parameters `<user mention>` and `[reason]`")
    .addField("Utility Commands (10)", "`unsplash` | `covid` | `hb` | `npm` | `ping` | `github <username>` | `vote` | `avatar` | `fortnite` | `ow <name> <platform>`")
    .addField("Fun Commands (9)", "`joke` | `chucknorris` | `8ball` | `quote` | `quiz` | `ascii` | `flip` | `dog` | `cat`")
    .addField("Music Commands (7)", "`play/p` | `skip` | `queue/q` | `nowplaying/np` | `resume` | `volume` | `stop`")
    .addField("NSFW Commands (5)", "`ecchi` | `hentai` | `boobs` | `ass` | `neko`")
    .addField("Moderation Commands (5)", "`ban` | `warn` | `kick` | `mute` | `unmute`")
    .addField("Anime Commands (3)", "`anime <query>` | `animeme` | `animequote`")
    .addField("Leveling Commands (2)", "`rank [user mention]` | `lbd (leaderboard) <page number>`")
    .addField("Statistics/Info Commands (3)", "`stats` | `userstats` | `serverstats`")
    .setTimestamp(moment.utc().format())
    .setColor("#ff1453")
    .setFooter(`<> refers to required parameters and [] to optional`, bot.user.displayAvatarURL);
  message.channel.send(embed)
};

module.exports.help = {
  name: "help"
};