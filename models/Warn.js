const mongoose = require("mongoose");

const WarnSchema = new mongoose.Schema({
  guildID: String,
  guildName: String,
  wUserName: String,
  wUserID: String,
  moderator: String,
  reason: String,
  date_time: String
});

module.exports = mongoose.model("Warn", WarnSchema);