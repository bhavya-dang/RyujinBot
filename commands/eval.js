const Discord = require("discord.js"),
fs = require("fs"),
Hastebin = require("hastebin-gen");

module.exports.run = async (bot, message, args) => {
  const devs = ["414111663076147201"];
  
  if (!devs.includes(message.author.id)) { 
    return undefined;
  };
  
  function clean(text) {
    if (typeof text != "string")
    text = require("util").inspect(text, {
      depth: 0
    });
     
  let tokenReg = new RegExp(bot.token, "gi");
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(tokenReg, bot.Footer)
    return text;
  };
   
  const botNoCode = new Discord.RichEmbed();
  botNoCode.setFooter("Please give me something to Evaluate.")
  botNoCode.setTimestamp()
  botNoCode.setColor("#FCF3B0")

  if(!args[0]) return message.channel.send(botNoCode).then(msg => msg.delete(7500)).catch(O_o => {});
  if(!args) return message.channel.send(botNoCode).then(msg => msg.delete(7500)).catch(O_o => {});
  
  const botEvalEmbed = new Discord.RichEmbed();
  const botCode = args.join(" ");
  try{
    const botEvaled = clean(await eval(botCode));
    botEvalEmbed.addField(":inbox_tray: Input", `\`\`\`\js\n${botCode}\n\`\`\``, false);
    botEvalEmbed.addField('Type', `\`\`\`xl\n${(typeof botEvaled).substr(0, 1).toUpperCase() + (typeof botEvaled).substr(1)}\n\`\`\``)
    if(botEvaled.constructor.name == "Promise") botEvalEmbed.addField("Output [Promise]", `\`\`\`\js\n${botEvaled}\n\`\`\``, false);
    else botEvalEmbed.addField(":outbox_tray: Output", `\`\`\`\js\n${botEvaled}\n\`\`\``, false);
    botEvalEmbed.setColor("#FCF3B0")
    botEvalEmbed.setTimestamp()
    
    if(botEvaled.length < 750) return message.channel.send(botEvalEmbed).catch(O_o => {});
    else {
      let botHastEvaled = await Hastebin(botEvaled, "js");
      const botHastEvalEmbed = new Discord.RichEmbed();
      botHastEvalEmbed.setColor("#FCF3B0")
      botHastEvalEmbed.addField("Input", `\`\`\`\js\n${botCode}\n\`\`\``, false);
      botHastEvalEmbed.addField("Output", `\n**[:${botHastEvaled}:](${botHastEvaled})**`, false)
      botHastEvaled.setTimestamp()
      return message.channel.send(botHastEvalEmbed).catch(O_o => {});
    };
  } catch(err) {
    botEvalEmbed.addField("Output", `\`\`\`js\n${err}\n\`\`\``, false);
    botEvalEmbed.setColor("#FCF3B0")
    botEvalEmbed.setTimestamp()
    return message.channel.send(botEvalEmbed).catch(O_o => {});
  };
}; 

module.exports.help = {
	name: "eval"
}