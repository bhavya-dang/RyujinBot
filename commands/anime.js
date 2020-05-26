const Discord = require("discord.js");
const malScraper = require("mal-scraper");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  let query = args.join(" ");
  if (!query) {
    return message.channel.send(
      (embed = {
        title: "**ERROR - Missing Parameters!**",
        fields: [
          {
            name: "Usage",
            value: "`r@anime <search query>`",
            inline: true,
          },
        ],
      })
    );
  } else {
    const data = malScraper.getInfoFromName(query).then(d => {return d})
    console.log(data);
    //   let embed = new Discord.RichEmbed()
    //     .setTimestamp(moment.utc().format())
    //     .setFooter("Information supplied by MyAnimeList")
    //     .setTitle(data.title)
    //     .setURL(data.url)
    //     .setDescription(`**Synopsis:**\n${data.synopsis}`)
    //     .setColor("#ff1453")
    //     .setThumbnail(data.picture)
    //     .addField("English Title", data.englishTitle, true)
    //     // .addField("Genres", data.genres.join(", "))
    //     .addField("Episodes", data.episodes, true)
    //     .addField("Aired", data.aired, true)
    //     .addField("Status".data.status, true)
    //     .addField("Score", data.score)
    //     .addField("Rank", data.ranked);
    //     // .addField("Studio(s)", data.studios.join(", "));

    //     message.channel.send(embed);
  }
};

module.exports.help = {
  name: "anime",
};
