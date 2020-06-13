const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
  guildId: String,
  guildName: String,
  guildOwner: String,
  guildOwnerID: String,
  memberCount: String,
  prefix: String,
  modChannel: String,
  logChannel: String,
  autoRole: String,
  muteRole: String,
  time: String
});

module.exports = mongoose.model("Guild", GuildSchema);