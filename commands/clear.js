const Discord = require("discord.js"),
  fs = require("fs"),
  moment = require("moment");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if (message.guild.id !== "714798049398095882")
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          `This command is still in development. Only accessible in the [\`support server!\`](https://discord.gg/btKWdJ)`
        )
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );

  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(`You cannot use this command!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  if (!args[0])
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(`Please specify a valid number`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  try {
    message.channel.bulkDelete(Math.floor(args[0])).then(() => {
      message.channel
        .send(`Cleared ${Math.floor(args[0])} messages.`)
        .then((msg) => msg.delete(2000));
    });
  } catch (error) {
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(`I cannot delete messages that are 14 days old!`)
        .setTimestamp(moment.utc().format())
        .setColor("#ffe66b")
    );
  }
};

module.exports.help = {
  name: "clear",
};
