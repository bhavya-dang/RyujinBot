const Discord = require("discord.js");
const oversmash = require("oversmash");
const ow = oversmash();
module.exports.run = async (bot, message, args) => {
  ow.player("bob#12345").then((player) => {
    console.log(player);
  });
};

module.exports.help = {
  name: "ow",
};
