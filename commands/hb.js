const hastebin = require("hastebin-gen");
const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  await message.delete(1000);
  const ext = args.slice(0, 1);
  let code = args.slice(1).join(" ");
  try {
    hastebin(code, { extension: ext }).then((r) => {
      let embed = new Discord.RichEmbed()
        .setTitle("**Hastebin Generator**")
        .setDescription(
          `**Your code was sent to Hastebin!**\n\nHere is the link: [\`${r}\`](${r})`
        )
        .setTimestamp(moment.utc().format())
        .setColor("BLUE");
      message.channel.send(embed);
    });
  } catch (e) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setTitle("**ERROR!**")
        .addField("Usage:", "`p@unsplash <query>`")
        .setFooter(
          "There might have been some error with the api. Please try again later."
        )
        .setTimestamp(moment.utc().format()),
    });
  }
};
module.exports.help = {
  name: "hb",
};
