const mongoose = require("mongoose");

const KickSchema = new mongoose.Schema({
  guildID: String,
  guildName: String,
  kUserName: String,
  kUserID: String,
  moderator: String,
  reason: String,
  date_time: String
});

module.exports = mongoose.model("Kick", KickSchema);