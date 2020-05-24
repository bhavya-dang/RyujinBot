const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) { 
  const mainEmbed = new Discord.RichEmbed()
  .setAuthor("Help", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .addField("g@help fun", "Fun Commands")
  .addField("g@help nsfw", "NSFW Commands")
  .addField("g@help anime", "Anime Commands")
  .addField("g@help music", "Music Commands")
  .addField("g@help utility", "Utility Commands")
  .addField("g@help statistics", "Statistics Commands")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(mainEmbed);
  }else if(args[0] === "fun"){
  
  const funEmbed = new Discord.RichEmbed()
  .setAuthor("Fun Commands", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .setFooter(bot.Footer)
  .addField("g@8ball", "Ask the magical 8ball a question!")
  .addField("g@ascii", "Asciify text!")
  .addField("g@cat", "Get random cat image!")
  .addField("g@dog", "Get random dog image.")
  .addField("g@flip", "Flip a coin!")
  .addField("g@joke", "Get a random joke!")
  .addField("g@quiz", "Play a quiz!")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(funEmbed);
  }else if(args[0] === "nsfw"){
  
  const nsfwEmbed = new Discord.RichEmbed()
  .setAuthor("NSFW Commands", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .addField("g@ecchi", "Get an ecchi image!")
  .addField("g@hentai", "Get an hentai image!")
  .addField("g@boobs", "Get boobs image!")
  .addField("g@ass", "Get ass image.")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(nsfwEmbed);
  }else if(args[0] === "anime"){
  
  const animeEmbed = new Discord.RichEmbed()
  .setAuthor("Anime Commands", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .addField("g@animeme", "Get an anime meme.")
  .addField("g@neko", "Get a random Neko image!")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(animeEmbed);
  }else if(args[0] === "music"){
  
  const animeEmbed = new Discord.RichEmbed()
  .setAuthor("Music Commands", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .addField("g@play/p", "Play music.")
  .addField("g@pause", "Pause music.")
  .addField("g@stop/s", "Stop music.")
  .addField("g@np/nowplaying", "See `Now Playing` music.")
  .addField("g@resume/r", "Resume music.")
  .addField("g@queue/q", "See music queue.")
  .addField("g@skip/sk", "Skip music.")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(animeEmbed);
  }else if(args[0] === "utility"){
  
  const animeEmbed = new Discord.RichEmbed()
  .setAuthor("Utility Commands", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .addField("g@avatar", "Get avatar of a user.")
  .addField("g@csgo", "Get CSGO information about a user.")
  .addField("g@npm", "Search about a npm package.")
  .addField("g@ping", "Get my ping!")
  .addField("g@vote", "Do a poll!")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(animeEmbed);
  }else if(args[0] === "statistics"){
  
  const statsEmbed = new Discord.RichEmbed()
  .setAuthor("Statistics Commands", bot.user.displayAvatarURL)
  .setColor("#ffffff")
  .addField("g@stats", "Get bot stats.")
  .addField("g@userstats", "Get user stats.")
  .addField("g@serverstats", "Get server stats.")
  .setFooter(bot.Footer, bot.user.displayAvatarURL);
  message.channel.send(statsEmbed);
  }
  
  
}
module.exports.help = {
  name: "help"
}
