const hastebin = require('hastebin-gen-2');
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
let code = args.join(" ")
try {
  hastebin(code, "js").then(r => {
    let embed = new Discord.RichEmbed()
    //.setTitle("Hastebin Generator")
    .setAuthor(`${bot.user.username} Hastebin Generator`, bot.user.displayAvatarURL)
    .setDescription(`**Your code was sent to Hastebin!**\n\nHere is the link: [\`${r}\`](${r})`)
    .setTimestamp()
    .setColor("BLUE")
    message.channel.send(embed); 
})
}catch(e){
message.channel.send("Encountered an error with the api. Please try again later.")
}
}
module.exports.help = {
name: "hb"
}
