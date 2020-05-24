const Discord = require("discord.js");
module.exports.run = async(bot, message, args) => {
    message.guild.members.map(user => {
        // if(user.id == message.author.id || user.id == bot.user.id);
            let embed = new Discord.RichEmbed()
            .setTitle("POLARISGG ~ Announcement!!!")
            .setThumbnail(message.guild.iconURL)
            .setColor("00ffc3")
            .setDescription(args.join(" "));
            user.send(embed);
    });
};

module.exports.help = {
    name: "dm"
}
