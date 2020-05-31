const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
  const country = args[0];
  const d = await fetch(
    `https://api.covid19api.com/live/total/country/${country}`
  ).then((res) => res.json());
  if (!d || d.length <= 0) {
    let dEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .setDescription(
        "Could not fetch data. Please try again or make sure the country is correctly spelled!"
      )
      .setTimestamp(moment.utc().format());
    message.channel.send(dEmbed);
  }
  let data = d[0];
  if (country) {
    const embed = new Discord.RichEmbed()
      .setTitle("Global Copvid-19 Data")
      .setURL(`https://www.worldometers.info/coronavirus/`)
      .setThumbnail(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQla-GbabU21gOd7omPLBcKZJBoiRA2V4zEhTpLx0zLSYhJSBXJ&usqp=CAU"
      )
      .addField("Country", data.country, true)
      .addField("Confirmed", data.confirmed, true)
      .addField("Recovered", data.recovered, true)
      .addField("Deaths", data.deaths, true)
      .addField("Active", data.active, true)
      .setFooter("Powered by Covid-19 API.")
      .setTimestamp(moment.utc().format())
      .setColor("hsl(353, 81%, 51%)");

    message.channel.send(embed);
  } else {
    let uEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .addField("Usage", "`r@covid <country>`")
      .setTimestamp(moment.utc().format());
    return message.channel.send(uEmbed);
  }
};

module.exports.help = {
  name: "covid",
};
