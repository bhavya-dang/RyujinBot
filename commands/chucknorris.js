const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {

  const data = await fetch(`https://api.chucknorris.io/jokes/random`).then((res) =>
    res.json()
  );
  if (!data || data.length <= 0) {
    let dEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .setDescription(
        "Could not fetch data. Please try again!"
      )
      .setTimestamp(moment.utc().format());
    message.channel.send(dEmbed);
  }
  const embed = new Discord.RichEmbed()
    .setTitle("Chuck Norris Jokes")
    .setURL(data.url)
    .setThumbnail(data.icon_url)
    .setDescription(data.value)
    .setFooter("Powered by Chuck Norris API.")
    .setTimestamp(moment.utc().format())
    .setColor("#F15A24");

  message.channel.send(embed);
};

module.exports.help = {
  name: "chucknorris",
};
