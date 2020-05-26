const Discord = require("discord.js");
const ow = require('overwatch-stats-api');

module.exports.run = async (bot, message, args) => {
    const stats = await ow.getAllStats('HusseinObama-11715', 'pc');
    console.log(stats);
};

module.exports.help = {
  name: "ow",
};
