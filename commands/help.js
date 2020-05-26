const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) { 
  const mainEmbed = new Discord.RichEmbed()
  .setAuthor("Help", bot.user.displayAvatarURL)
  .setColor("")
  .addField("r@help fun", "Fun Commands")
  .addField("r@help nsfw", "NSFW Commands")
  .addField("r@help anime", "Anime Commands")
  .addField("r@help music", "Music Commands")
  .addField("r@help utility", "Utility Commands")
  .addField("r@help statistics", "Statistics Commands")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(mainEmbed);
  }else if(args[0] === "fun"){
  
  const funEmbed = new Discord.RichEmbed()
  .setAuthor("Fun Commands", bot.user.displayAvatarURL)
  .setColor("#F44336")
  .setFooter(bot.Footer)
  .addField("r@8ball <question>", "Ask the magical 8ball a question!")
  .addField("r@ascii <query>", "Asciify text!")
  .addField("r@cat", "Get random cat image!")
  .addField("r@dog", "Get random dog image.")
  .addField("r@flip", "Flip a coin!")
  .addField("r@joke", "Get a random joke!")
  .addField("r@quiz", "Play a quiz!")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(funEmbed);
  }else if(args[0] === "nsfw"){
  
  const nsfwEmbed = new Discord.RichEmbed()
  .setAuthor("NSFW Commands", bot.user.displayAvatarURL)
  .setColor("#F44336")
  .addField("r@ecchi", "Get an ecchi image!")
  .addField("r@hentai", "Get an hentai image!")
  .addField("r@boobs", "Get boobs image!")
  .addField("r@ass", "Get ass image.")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(nsfwEmbed);
  }else if(args[0] === "anime"){
  
  const animeEmbed = new Discord.RichEmbed()
  .setAuthor("Anime Commands", bot.user.displayAvatarURL)
  .setColor("#F44336")
  .addField("r@animeme", "Get an anime meme.")
  .addField("r@anime <query>", "Fetch info about any anime!")
  .addField("r@manga <query>", "Fetch info about any manga!")
  .addField("r@neko", "Get a random Neko image!")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(animeEmbed);
  }else if(args[0] === "music"){
  
  const musicEmbed = new Discord.RichEmbed()
  .setAuthor("Music Commands", bot.user.displayAvatarURL)
  .setColor("#F44336")
  .addField("r@play/p <query>", "Play music.")
  .addField("r@pause", "Pause music.")
  .addField("r@stop/s", "Stop music.")
  .addField("r@np/nowplaying", "See `Now Playing` music.")
  .addField("r@resume/r", "Resume music.")
  .addField("r@queue/q", "See music queue.")
  .addField("r@skip/sk", "Skip music.")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(musicEmbed);
  }else if(args[0] === "utility"){
  
  const utilEmbed = new Discord.RichEmbed()
  .setAuthor("Utility Commands", bot.user.displayAvatarURL)
  .setColor("#F44336")
  .addField("r@avatar <name>", "Get avatar of a user.")
  .addField("r@ow find <username>", "Get CSGO information about a user.")
  .addField("r@ <search query>", "Search about a npm package.")
  .addField("r@ping", "Get my ping!")
  .addField("r@vote", "Do a poll!")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(utilEmbed);
  }else if(args[0] === "statistics"){
  
  const statsEmbed = new Discord.RichEmbed()
  .setAuthor("Statistics Commands", bot.user.displayAvatarURL)
  .setColor("#F44336")
  .addField("r@stats", "Get bot stats.")
  .addField("r@userstats", "Get user stats.")
  .addField("r@serverstats", "Get server stats.")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(statsEmbed);
  }
  
  
}
module.exports.help = {
  name: "help"
}
