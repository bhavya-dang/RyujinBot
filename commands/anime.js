const Discord = require("discord.js");
const malScraper = require("mal-scraper");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  let query = args.join(" ");
  if (!query || args.length === 0) {
    let errEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR** - Missing pramaters!")
      .addField("**Usage**", "`r@anime <title>`")
      .setTimestamp(moment.utc().format());

    message.channel.send(errEmbed);
  } else {
    try {
      const data = await malScraper.getInfoFromName(query);
      if (!data) {
        let errEmbed = new Discord.RichEmbed()
          .setTitle("**ERROR** - Could not fetch data (403)")
          .setDescription("The MyAnimeList API might be down currently. Please try again later!")
          .setTimestamp(moment.utc().format());

        message.channel.send(errEmbed);
      }
      const embed = new Discord.RichEmbed()
        .setTimestamp(moment.utc().format())
        .setFooter("Information supplied by MyAnimeList API")
        .setTitle(data.title)
        .setURL(data.url)
        .setColor("#ff1453")
        .setThumbnail(data.picture)
        .addField("**English Title**", data.englishTitle, true)
        .addField("**Genres**", data.genres.toString().replace(/(?:\,)/g, " | "))
        .addField("**Episodes**", data.episodes, true)
        .addField("**Aired**", data.aired, true)
        .addField("**Status**", data.status, true)
        .addField("**Score**", data.score, true)
        .addField("**Rank**", data.ranked, true)
        .addField("**Studio(s)**", data.studios.toString().replace(",", ", "), true)
        .setDescription(`**Synopsis:**\n${data.synopsis.slice(0, -25)}`);

      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.help = {
  name: "anime",
};