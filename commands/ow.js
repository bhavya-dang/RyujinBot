const Discord = require("discord.js");
const ow = require("overwatch-stats-api");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
  const name = args.slice(0, 1);
  const platform = args.slice(1);
  if (!name || !platform || args.length === 0) {
    let errEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR** - Missing pramaters!")
      .addField("**Usage**", "`r@ow <name> <platform>`")
      .setTimestamp(moment.utc().format());

    message.channel.send(errEmbed);
  } else {
    const stats = await ow.getAllStats(name, platform);

    const embed = new Discord.RichEmbed()
      .setTitle(stats.battletag)
      .setURL(stats.profileURL)
      .setThumbnail(stats.iconURL)
      .setColor("#f57e00")
      .setTimestamp(moment.utc().format())
      .addField("Level", stats.level, true)
      .addField("Prestige", stats.prestige, true)
      .addField("Endorsement Level", stats.endorsementLevel, true)
      .setFooter("Information supplied by Overwatch API Wrapper.");

    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "ow",
};
