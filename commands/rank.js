const Discord = require("discord.js");
const moment = require("moment");
const { createCanvas, loadImage } = require("canvas");

module.exports.run = async (bot, message, args) => {
  let user = message.mentions.members.first() || message.member;

  const data = await bot.db.get(`level-${message.guild.id}-${user.id}`);

  if (user.length <= 0)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription(
          "Please mention or specify a user's id to get their rank!"
        )
        .setFooter("Developed by Sync#0666", bot.user.displayAvatarURL)
        .setTimestamp(moment.utc().format())
    );
  if (!message.guild.members.map((m) => m.id).includes(user.id))
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("That user id does not belong to this server!")
        .setTimestamp(moment.utc().format())
        .setFooter("Developed by Sync#0666", bot.user.displayAvatarURL)
    );

  if (!data)
    return message.channel.send(
      new Discord.RichEmbed()
        .setTitle("**ERROR**")
        .setDescription("That user does not have a rank!")
        .setTimestamp(moment.utc().format())
        .setFooter("Developed by Sync#0666", bot.user.displayAvatarURL)
    );

  const canvas = createCanvas(1000, 333);
  const ctx = canvas.getContext("2d");
  const background = await loadImage(
    "https://images.unsplash.com/photo-1501975558162-0be7b8ca95ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#000000";
  ctx.fillRect(180, 216, 770, 65);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeRect(180, 216, 770, 65);
  ctx.stroke();

  ctx.fillStyle = "#ff1453";
  ctx.globalAlpha = 0.6;
  ctx.fillRect(180, 216, (100 / (data.level * 40)) * data.xp * 7.7, 65);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.font = "30px Verdana";
  ctx.fontWeight = "bold"
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${data.xp} / ${data.level * 40} XP`, 600, 260);

  ctx.textAlign = "left";
  ctx.fillText(user.user.tag, 310, 120);

  ctx.font = "50px Verdana";
  ctx.fontWeight = "bold"
  ctx.fillText(`Level:`, 310, 180);
  ctx.fillText(data.level, 470, 180);

  ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.closePath();
  ctx.clip();

  const avatar = await loadImage(user.user.displayAvatarURL);
  ctx.drawImage(avatar, 40, 40, 250, 250);

  let attachment = new Discord.Attachment(canvas.toBuffer(), "rank.png");
  message.channel.send(attachment);
};

module.exports.help = {
  name: "rank",
};
