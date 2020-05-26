const fortnite = require("fortnite.js");
const discord = require("discord.js");
const fn = new fortnite(process.env.FORTNITE_API_KEY);

module.exports.run = async (bot, message, args) => {
  const query = args.join(" ");
  const data = await fn.get(query, fortnite.PC);
  console.log(data);
};

module.exports.help = {
  name: "fornite",
};
