const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const aq = require('animequote');

module.exports.run = async (bot, message, args) => {

  const data = aq();
  const quote = data.quotesentence
  const char = data.quotecharacter
  const anime = data.quoteanime

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
    .setTitle("Anime Quotes")
    .setDescription(quote)
    .addField("Character", char, true)
    .addField("Anime", anime, true)
    .setTimestamp(moment.utc().format())
    .setColor("#ff2014");

  message.channel.send(embed);
};

module.exports.help = {
  name: "animequote",
};
