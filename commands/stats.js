const Discord = require("discord.js");
let cpuusage = process.cpuUsage();
let cpu = Math.floor(cpuusage.user / cpuusage.system) + "%";
const os = require("os");
// let upSecs = 0;
// let upMins = 0;
// let upHours = 0;
// let upDays = 0;
// setInterval(function() {
//     upSecs = upSecs + 1
//     if (upSecs >= 60) {
//         upSecs = 0
//         upMins = upMins + 1
//     }
//     if (upMins >= 60) {
//         upMins = 0
//         upHours = upHours + 1
//     }
//     if (upHours >= 24) {
//         upHours = 0
//         upDays = upDays + 1
//     }
// }, 1000)
module.exports.run = async (bot, message, args) => {
  let totalSeconds = bot.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  message.channel.send(
    `= STATISTICS =
• Bot        :: ${bot.user.tag}
• Prefix     :: r@
• Developer  :: ${bot.users.get("414111663076147201").tag}
• CPU Usage  :: ${cpu}
• Arch Type  :: ${os.arch()}
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds
• Users      :: ${bot.guilds
      .reduce((a, b) => a + b.memberCount, 0)
      .toLocaleString()}
• Servers    :: ${bot.guilds.size.toLocaleString()}
• Channels   :: ${bot.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Node       :: ${process.version}`,
    { code: "asciidoc" }
  );
};

module.exports.help = {
  name: "stats",
};
