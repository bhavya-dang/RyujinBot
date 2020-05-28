const Discord = require("discord.js");
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
      const embed = new Discord.RichEmbed()
        .setTitle("**Unsplash Image Search**")
        .setURL(`${data.links.download.substring(0, data.links.download - 8)}`)
        .setImage(data.urls.full)
        .addField("**Description**", data.description)
        .addField("**Username**", data.user.username, true)
        .addField("**Instagram Username**", data.user.instagram_username, true)
        .addField("**Likes**", data.likes, true)
        .addField(
          "**Downloads**",
          data.downloads.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
          true
        )
        .addField(
          "**Download Image**",
          `[\`Here!\`](${data.links.download})`,
          true
        );
        message.channel.send(embed)
    });
};
module.exports.help = {
  name: "unsplash",
};
