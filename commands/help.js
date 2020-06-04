const Discord = require(`discord.js`);

module.exports.run = async (bot, message, args) => {
  let prefix;
  db.collection(`guilds`)
  .doc(message.guild.id)
  .get()
  .then((q) => {
    if (q.exists) {
      prefix = q.data().prefix;
    }
  })
  .then(() => {
    if(!args[0]) { 
      const mainEmbed = new Discord.RichEmbed()
      .setTitle(`Command List`)
      .setColor(`#e17c60`)
      .addField(`\u2022 ${prefix}help mod`, `Moderation Commands`)
      .addField(`\u2022 ${prefix}help setup`, `Custom Setup Commands`)
      .addField(`\u2022 ${prefix}help fun`, `Fun Commands`)
      .addField(`\u2022 ${prefix}help nsfw`, `NSFW Commands`)
      .addField(`\u2022 ${prefix}help anime`, `Anime Commands`)
      .addField(`\u2022 ${prefix}help music`, `Music Commands`)
      .addField(`\u2022 ${prefix}help utility`, `Utility Commands`)
      .addField(`\u2022 ${prefix}help statistics`, `Statistics Commands`)
      .setFooter(`Developed by Sync#0666`);
      message.channel.send(mainEmbed);
      }else if(args[0] === `fun`){
      
      const funEmbed = new Discord.RichEmbed()
      .setTitle(`Fun Commands`)
      .setColor(`#F44336`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL)
      .addField(`\u2022 ${prefix}8ball <question>`, `Ask the magical 8ball a question!`)
      .addField(`\u2022 ${prefix}ascii <query`, `Asciify text!`)
      .addField(`\u2022 ${prefix}cat`, `Get random cat image!`)
      .addField(`\u2022 ${prefix}dog`, `Get random dog image.`)
      .addField(`\u2022 ${prefix}flip`, `Flip a coin!`)
      .addField(`\u2022 ${prefix}joke`, `Get a random dad joke!`)
      .addField(`\u2022 ${prefix}chucknorris`, `Get a random chuck norris joke!`)
      .addField(`\u2022 ${prefix}quiz`, `Play a quiz!`)
      .addField(`\u2022 ${prefix}quote`, `Get a random quote!`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL);
    
      message.channel.send(funEmbed);
      }else if(args[0] === `nsfw`){
      
      const nsfwEmbed = new Discord.RichEmbed()
      .setTitle(`NSFW Commands`)
      .setColor(`#F44336`)
      .addField(`\u2022 ${prefix}ecchi`, `Get an ecchi image!`)
      .addField(`\u2022 ${prefix}hentai`, `Get an hentai image!`)
      .addField(`\u2022 ${prefix}boobs`, `Get boobs image!`)
      .addField(`\u2022 ${prefix}neko`, `Get a random Neko image!`)
      .addField(`\u2022 ${prefix}ass`, `Get ass image.`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL);
      message.channel.send(nsfwEmbed);
      }else if(args[0] === `anime`){
      
      const animeEmbed = new Discord.RichEmbed()
      .setTitle(`Anime Commands`)
      .setColor(`#F44336`)
      .addField(`\u2022 ${prefix}animeme`, `Get an anime meme.`)
      .addField(`\u2022 ${prefix}anime <query>`, `Fetch info about any anime!`)
      .addField(`\u2022 ${prefix}animequote`, `Get a random anime quote!`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL);
      message.channel.send(animeEmbed);
      }else if(args[0] === `music`){
      
      const musicEmbed = new Discord.RichEmbed()
      .setTitle(`Music Commands`)
      .setColor(`#F44336`)
      .addField(`\u2022 ${prefix}play/p <query>`, `Play music.`)
      .addField(`\u2022 ${prefix}pause`, `Pause music.`)
      .addField(`\u2022 ${prefix}stop/s`, `Stop music.`)
      .addField(`\u2022 ${prefix}np/nowplaying`, `See `Now Playing` music.`)
      .addField(`\u2022 ${prefix}resume/r`, `Resume music.`)
      .addField(`\u2022 ${prefix}queue/q`, `See music queue.`)
      .addField(`\u2022 ${prefix}skip/sk`, `Skip music.`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL);
      message.channel.send(musicEmbed);
      }else if(args[0] === `utility`){
      
      const utilEmbed = new Discord.RichEmbed()
      .setTitle(`Utility Commands`)
      .setColor(`#F44336`)
      .addField(`\u2022 ${prefix}covid`, `Track live Covid-19 data by Country.`)
      .addField(`\u2022 ${prefix}unsplash <query>`, `Search unsplash for images!`)
      .addField(`\u2022 ${prefix}hb <extension> <code>`, `Generate a hastebin code link.`)
      .addField(`\u2022 ${prefix}ow find <username>`, `Get CSGO information about a user.`)
      .addField(`\u2022 ${prefix}fortnite <username>`, `Get fortnite information about a user.`)
      .addField(`\u2022 ${prefix}npm <search query>`, `Search about a npm package.`)
      .addField(`\u2022 ${prefix}ping`, `Get my ping!`)
      .addField(`\u2022 ${prefix}vote`, `Do a poll!`)
      .addField(`\u2022 ${prefix}avatar <name>`, `Get avatar of a user.`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL);
      message.channel.send(utilEmbed);
      }else if(args[0] === `statistics`){
      
      const statsEmbed = new Discord.RichEmbed()
      .setTitle(`Statistics Commands`)
      .setColor(`#F44336`)
      .addField(`\u2022 ${prefix}stats`, `Get bot stats.`)
      .addField(`\u2022 ${prefix}userstats`, `Get user stats.`)
      .addField(`\u2022 ${prefix}serverstats`, `Get server stats.`)
      .setFooter(`Developed by Sync#066`, bot.user.displayAvatarURL);
      message.channel.send(statsEmbed);
      }else if(args[0] === `mod`){
      
        const modEmbed = new Discord.RichEmbed()
        .setTitle(`Moderation Commands`)
        .setColor(`#F44336`)
        .addField(`\u2022 ${prefix}ban <@mention> <reason>`, `Ban a user!`)
        .addField(`\u2022 r${prefix}kick <@mention> <reason>`, `Kick a user!`)
        .addField(`\u2022 ${prefix}clear <number>`, `Clear messages in chat!`)
        .addField(`\u2022 ${prefix}mute <@mention> <reason>`, `Mute a user!`)
        .addField(`\u2022 ${prefix}unmute <@mention>`, `Unmute a muted user!`)
        .setFooter(`Developed by Sync#066 | [UNDER DEVELOPMENT]`, bot.user.displayAvatarURL);
        message.channel.send(modEmbed);
  });
  }
  
  
}
module.exports.help = {
  name: `help`
}
