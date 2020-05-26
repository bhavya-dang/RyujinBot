const fortnite = require("fortnite.js");
const Discord = require("discord.js");
const moment = require("moment");
const fn = new fortnite(process.env.FORTNITE_API_KEY);

module.exports.run = async (bot, message, args) => {
  const query = args.join(" ");
  const data = await fn.get(query, fortnite.PC);
  const embed = new Discord.RichEmbed()
  // .setTitle(data.account.displayName)
  // .setURL(`https://fortnitetracker.com/profile/all/${data.account.displayName}`)
  .setTitle("Stats")
  .setFooter("Information supplied by fortnitetracker.com")
  .setTimestamp(moment.utc().format())
  .addField("Kills", data.stats.kills, true)
  .addField("K/D Ratio", data.stats.kd, true)
  .addField("Top 1/3/5/6/12/25", `${data.stats.top1}/${data.stats.top3}/${data.stats.top5}/${data.stats.top6}/${data.stats.top12}/${data.stats.top25}/`)
  .addField("Score", data.stats.score, true)
  .addField("Win %", data.stats.winPercent, true)
  .addField("Matches", data.stats.matches, true)
  .setColor("#EEFF41")

  message.channel.send(embed);
};

module.exports.help = {
  name: "fornite",
};
