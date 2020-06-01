const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const axios = require("axios");
module.exports.run = async (bot, message, args) => {
  const country = args.join(" ");
  const data = await axios({
    method: "GET",
    url: `https://api.covid19api.com/live/country/${country}`,
  });
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
  const embed = new Discord.RichEmbed()
    .setTitle("Global Covid-19 Live Data")
    .setURL(`https://www.worldometers.info/coronavirus/`)
    .setThumbnail(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQla-GbabU21gOd7omPLBcKZJBoiRA2V4zEhTpLx0zLSYhJSBXJ&usqp=CAU"
    )
    .addField("Country", d.Country)
    .addField("Confirmed", d.Confirmed.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .addField("Recovered", d.Recovered.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .addField("Deaths", d.Deaths.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .addField("Active", d.Active.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
    .setFooter("Powered by Covid-19 API.")
    .setTimestamp(moment.utc().format())
    .setColor("#e71d34");

  message.channel.send(embed);
  if (!country) {
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
