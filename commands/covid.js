const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const axios = require("axios");
module.exports.run = async (bot, message, args) => {
  const country = args[0];
  const data = await axios({
    method: "GET",
    url: `https://api.covid19api.com/live/country/${country}`
  })
  let d = data.data[0];
  if (!data || data.length <= 0) {
    let dEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .setDescription(
        "Could not fetch data. Please try again or make sure the country is correctly spelled!"
      )
      .setTimestamp(moment.utc().format());
    message.channel.send(dEmbed);
  }
  console.log(d);
  if (country) {
    const embed = new Discord.RichEmbed()
      .setTitle("Global Covid-19 Data")
      .setURL(`https://www.worldometers.info/coronavirus/`)
      .setThumbnail(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQla-GbabU21gOd7omPLBcKZJBoiRA2V4zEhTpLx0zLSYhJSBXJ&usqp=CAU"
      )
      .addField("Country", d.country)
      .addField("Confirmed", d.confirmed)
      .addField("Recovered", d.recovered)
      .addField("Deaths", d.deaths)
      .addField("Active", d.active)
      .setFooter("Powered by Covid-19 API.")
      .setTimestamp(moment.utc().format())
      .setColor("#e71d34");

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
