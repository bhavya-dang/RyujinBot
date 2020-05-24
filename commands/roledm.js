const Discord = require("discord.js");
module.exports.run = async(bot, message, args) => {
    message.guild.members.map(user => {
        // if(user.id == message.author.id || user.id == bot.user.id)
        const role = message.guild.roles.find(r => r.name = args[0]);
        if(user.roles.has(role.id)){
            let embed = new Discord.RichEmbed()
            .setTitle("POLARISGG ~ Announcement!!!")
            .setThumbnail(message.guild.iconURL)
            .setColor("00ffc3")
            .setDescription(args[1]);
            user.send(embed);
        }else return;
    });
};

module.exports.help = {
    name: "roledm"
}