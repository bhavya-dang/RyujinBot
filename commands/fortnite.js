const fortnite = require("fortnite.js");
const Discord = require("discord.js");
const moment = require("moment");
const fn = new fortnite(process.env.FORTNITE_API_KEY);

module.exports.run = async (bot, message, args) => {
  const query = args.join(" ");
  if (!query || args.length === 0) {
    let errEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR** - Missing pramaters!")
      .addField("**Usage**", "`r@fortnite <name>`")
      .setTimestamp(moment.utc().format());

    message.channel.send(errEmbed);
  } else {
    try {
      const data = await fn.get(query, fortnite.PC);
      const embed = new Discord.RichEmbed()
        .setTitle(data.displayName)
        .setURL(`https://fortnitetracker.com/profile/all/${data.displayName}`)
        .setFooter("Information supplied by fortnitetracker.com")
        .setTimestamp(moment.utc().format())
        .addField("Kills", data.stats.kills, true)
        .addField("K/D Ratio", data.stats.kd, true)
        .addField(
          "Top 1/3/5/6/12/25",
          `${data.stats.top1}/${data.stats.top3}/${data.stats.top5}/${data.stats.top6}/${data.stats.top12}/${data.stats.top25}`
        )
        .addField("Score", data.stats.score, true)
        .addField("Win %", data.stats.winPercent, true)
        .addField(
          "Matches",
          `${data.stats.matches
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`,
          true
        )
        .setColor("#EEFF41");

      message.channel.send(embed);
    } catch (error) {
      console.log(error);
      let Embed = new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .addField("Could Not fetch data! Please try again!")
        .setTimestamp(moment.utc().format());

      message.channel.send(errEmbed);
    }
  }
};

module.exports.help = {
  name: "fornite",
};
