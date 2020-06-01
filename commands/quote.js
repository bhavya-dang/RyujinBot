const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const axios = require("axios");
module.exports.run = async (bot, message, args) => {
  // // Fetching the categories
  // const catregoryURL = await fetch(
  //   `https://quotes.rest/qod/categories?language=en&detailed=false`
  // ).then((res) => console.log(res.json()));
  // let categories = Object.keys(catregoryURL.contents.categories);
  // let category = args[1];

  // // Category Quote o the day Data
  // let qdData = await fetch(
  //   `https://quotes.rest/qod?category=${category}&language=en`
  // ).then((res) => console.log(res.json()));
  // let quoteC = qdData.contents.quotes[0].quote;
  // let authorC = qdData.contents.quotes[0].author;
  // let titleC = qdData.contents.quotes[0].title;
  // let bgC = qdData.contents.quotes[0].background;
  // let permalinkC = qdData.contents.quotes[0].permalink;

  // Category Random Quote  Data
axios({
    method: "GET",
    url: "https://quotes15.p.rapidapi.com/quotes/random/",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "quotes15.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      language_code: "en",
    },
  })
    .then((data) => {
      console.log(data)
        let d = data.data
        const quote = d.content;
        const url = d.url;
        const author = d.originator.name;
        let qdEmbed = new Discord.RichEmbed()
        .setTitle("Random Quote")
        .setURL(url)
        .setDescription(quote)
        .addField("Author", author)
        .setColor("#02c59b")
        .setTimestamp(moment.utc().format())
        .setFooter("Powered by Quotes RapidAPI.")
      message.channel.send(qdEmbed);

    })
    .catch((error) => {
      console.log(error);
    });


  //   if (!data || data.length <= 0) {
  //     let dEmbed = new Discord.RichEmbed()
  //       .setTitle("**ERROR**")
  //       .setDescription(
  //         "Could not fetch data. Please try again or make sure the name is correctly spelled!"
  //       )
  //       .setTimestamp(moment.utc().format());
  //     message.channel.send(dEmbed);

  // if (args[0] === "day") {
  //   if (args[1] === "categories") {
  //     let allCategories = categories.toString().replace(",", " \n");
  //     let categoryList = new Discord.RichEmbed()
  //       .setTitle("Quotes Category List")
  //       .setDescription(allCategories)
  //       .setColor("#02c59b")
  //       .setTimestamp(moment.utc().format());
  //     message.channel.send(categoryList);
  //   } else if (args[1] && categories.includes(args[1])) {

  //   }
  // } else if (!args[0]) {
  //   let qEmbed = new Discord.RichEmbed()
  //     .setTitle(titleC)
  //     .setURL(permalinkC)
  //     .setDescription(quoteC)
  //     .addField("Author", authorC)
  //     .setThumbnail(bgC)
  //     .setColor("#02c59b")
  //     .setTimestamp(moment.utc().format());
  //   message.channel.send(qEmbed);
  // }
};

module.exports.help = {
  name: "quote",
};
