const Discord = require(`discord.js`);
const moment = require(`moment`);
let prefix = "r@";

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(`Help | ${message.guild.name}`, message.guild.iconURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Utility Commands (10)", "`unsplash` | `covid` | `hb` | `npm` | `ping` | `github` | `vote` | `avatar` | `fortnite` | `ow`")
    .addField("Fun Commands (9)", "`joke` | `chucknorris` | `8ball` | `quote` | `quiz` | `ascii` | `flip` | `dog` | `cat`")
    .addField("Music Commands (7)", "`play/p` | `skip` | `queue/q` | `nowplaying/np` | `resume` | `volume` | `stop`")
    .addField("NSFW Commands (5)", "`ecchi` | `warn` | `kick` | `mute` | `unmute`")
    .addField("Moderation Commands (5)", "`ban` | `hentai` | `boobs` | `ass` | `neko`")
    .addField("Anime Commands (3)", "`anime` | `animeme` | `animequote`")
    .addField("Statistics/Info Commands (3)", "`stats` | `userstats` | `serverstats`")
    .setTimestamp(moment.utc().format())
    .setColor("#ff1453")
    .setFooter(`Developed by Sync#066 | [UNDER DEVELOPMENT]`, bot.user.displayAvatarURL);
  message.channel.send(embed)
};

module.exports.help = {
  name: "help"
};