const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
global.fetch = fetch;
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_KEY });

module.exports.run = async (bot, message, args) => {
  let query = args.join(" ");
  if(!query) return message.channel.send({
      embed: new Discord.RichEmbed()
      .setTitle("**ERROR!** - Missing parameters.")
      .addField("Usage:", "`p@unsplash <query>`")
  })
  unsplash.photos
    .getRandomPhoto({ query: query })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
      const embed = new Discord.RichEmbed()
        .setTitle(`**Photo by ${data.user.username} on Unsplash**`)
        .setURL(`${data.links.download.slice(0, -8)}`)
        .setColor("#000")
        .setImage(data.urls.full)
        .addField("**Description**", data.description === null ? "None" : data.description)
        .addField("**Username**", data.user.username, true)
        .addField("**Instagram Username**", data.user.instagram_username === null ? "None" : data.user.instagram_username, true)
        .addField("**Likes**", data.likes.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","), true)
        .addField("**Views**", data.views.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","), true)
        .addField(
          "**Downloads**",
          data.downloads.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
          true
        )
        .addField(
          "**Download Image**",
          `[\`Here!\`](${data.links.download})`,
          true
        )
        .setFooter("Unsplash API")
        .setTimestamp(moment.utc().format())
        message.channel.send(embed)
    });
};
module.exports.help = {
  name: "unsplash",
};
