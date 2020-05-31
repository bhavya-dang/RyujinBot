const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
  const user = args.join(" ");
  if (!user || user.length <= 0) {
    let uEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .addField("Usage", "`r@github <username>`")
      .setTimestamp(moment.utc().format());
    message.channel.send(uEmbed);
  }
  const data = await fetch(`https://api.github.com/users/${user}`).then((res) =>
    res.json()
  );
  if (!data || data.length <= 0) {
    let dEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .setDescription(
        "Could not fetch data. Please try again or make sure the name is correctly spelled!"
      )
      .setTimestamp(moment.utc().format());
    message.channel.send(dEmbed);
  }
  const embed = new Discord.RichEmbed()
    .setTitle(data.login)
    .setURL(`https://github.com/${data.login}`)
    .setThumbnail(data.avatar_url)
    .addField("Name", data.name, true)
    .addField("Bio", data.bio)
    .setFooter("Powered by Github API V3.")
    .addField(
      "Website",
      `[\`${data.blog === null ? "Not specified." : data.blog}\'](${
        data.blog === null ? "Not specified." : data.blog
      })`
    )
    .addField("Followers", data.followers, true)
    .addField("Following", data.following, true)
    .setTimestamp(moment.utc().format())
    .setColor("#000");

  message.channel.send(embed);
};

module.exports.help = {
  name: "github",
};
