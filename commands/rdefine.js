const Discord = require("discord.js");
const urban = require("urban");

module.exports.run = async (client, message, args) => {
  
  urban.random().first(json => {

    if(!json) return message.channel.send("**No results found!**");
    let embed = new Discord.RichEmbed()
    .setURL(json.permalink)
    .setTitle(json.word)
    .setDescription(json.definition ? json.definition : "None")
    .addField("Example", json.example, true)
    .addField("Upvotes", json.thumbs_up, true)
    .addField("Downvotes", json.thumbs_down, true)
    .setFooter(`Written By ${json.author}`)
    .setColor("#ffffff");
    message.channel.send(embed);
  });
}

module.exports.help = {
    name: "rdefine"
}