const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) { 
  const mainEmbed = new Discord.RichEmbed()
  .setTitle("Help")
  .setColor("hsl(235, 21%, 21%)")
  .addField("r@help fun", "Fun Commands")
  .addField("r@help nsfw", "NSFW Commands")
  .addField("r@help anime", "Anime Commands")
  .addField("r@help music", "Music Commands")
  .addField("r@help utility", "Utility Commands")
  .addField("r@help statistics", "Statistics Commands")
  .setFooter(bot.Footer);
  message.channel.send(mainEmbed);
  }else if(args[0] === "fun"){
  
  const funEmbed = new Discord.RichEmbed()
  .setTitle("⚜ Fun Commands")
  .setColor("#F44336")
  .setFooter(bot.Footer)
  .addField("r@8ball <question>", "Ask the magical 8ball a question!")
  .addField("r@ascii <query>", "Asciify text!")
  .addField("r@cat", "Get random cat image!")
  .addField("r@dog", "Get random dog image.")
  .addField("r@flip", "Flip a coin!")
  .addField("r@joke", "Get a random dad joke!")
  .addField("r@chucknorris", "Get a random chuck norris joke!")
  .addField("r@quiz", "Play a quiz!")
  .addField("r@quotes", "Get a random quote or of a specific category!")
  .setFooter(bot.Footer);

  message.channel.send(funEmbed);
  }else if(args[0] === "nsfw"){
  
  const nsfwEmbed = new Discord.RichEmbed()
  .setTitle("🔞 NSFW Commands")
  .setColor("#F44336")
  .addField("r@ecchi", "Get an ecchi image!")
  .addField("r@hentai", "Get an hentai image!")
  .addField("r@boobs", "Get boobs image!")
  .addField("r@neko", "Get a random Neko image!")
  .addField("r@ass", "Get ass image.")
  .setFooter(bot.Footer);
  message.channel.send(nsfwEmbed);
  }else if(args[0] === "anime"){
  
  const animeEmbed = new Discord.RichEmbed()
  .setTitle("㊙ Anime Commands")
  .setColor("#F44336")
  .addField("r@animeme", "Get an anime meme.")
  .addField("r@anime <query>", "Fetch info about any anime!")
  .addField("r@animequote", "Get a random anime quote!")
  .setFooter(bot.Footer);
  message.channel.send(animeEmbed);
  }else if(args[0] === "music"){
  
  const musicEmbed = new Discord.RichEmbed()
  .setTitle("🎶 Music Commands")
  .setColor("#F44336")
  .addField("r@play/p <query>", "Play music.")
  .addField("r@pause", "Pause music.")
  .addField("r@stop/s", "Stop music.")
  .addField("r@np/nowplaying", "See `Now Playing` music.")
  .addField("r@resume/r", "Resume music.")
  .addField("r@queue/q", "See music queue.")
  .addField("r@skip/sk", "Skip music.")
  .setFooter(bot.Footer);
  message.channel.send(musicEmbed);
  }else if(args[0] === "utility"){
  
  const utilEmbed = new Discord.RichEmbed()
  .setTitle("⚙ Utility Commands")
  .setColor("#F44336")
  .addField("r@covid", "Track Covid-19 data by Country.")
  .addField("r@unsplash <query>", "Search unsplash for images!")
  .addField("r@hb <extension> <code>", "Generate a hastebin code link.")
  .addField("r@ow find <username>", "Get CSGO information about a user.")
  .addField("r@fortnite <username>", "Get fortnite information about a user.")
  .addField("r@npm <search query>", "Search about a npm package.")
  .addField("r@ping", "Get my ping!")
  .addField("r@vote", "Do a poll!")
  .addField("r@avatar <name>", "Get avatar of a user.")
  .setFooter(bot.Footer);
  message.channel.send(utilEmbed);
  }else if(args[0] === "statistics"){
  
  const statsEmbed = new Discord.RichEmbed()
  .setTitle("📈 Statistics Commands")
  .setColor("#F44336")
  .addField("r@stats", "Get bot stats.")
  .addField("r@userstats", "Get user stats.")
  .addField("r@serverstats", "Get server stats.")
  .setFooter(bot.Footer);
  message.channel.send(statsEmbed);
  }
  
  
}
module.exports.help = {
  name: "help"
}
