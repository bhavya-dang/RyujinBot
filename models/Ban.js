const mongoose = require("mongoose");

const BanSchema = new mongoose.Schema({
  guildID: String,
  guildName: String,
  bUserName: String,
  bUserID: String,
  moderator: String,
  reason: String,
  time: String
});

module.exports = mongoose.model("Ban", BanSchema);