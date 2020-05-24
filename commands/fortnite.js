const Discord = module.require('discord.js');
let fortnite = require('fortnite');
let request = require('request');
module.exports.run = async (bot, message, args) => {

  let headers = {
    'TRN-Api-Key': process.env.FORTNITE_API_KEY
  }
  if(!args[0]) return message.channel.send("Please enter a username");
  let options = {
    url: `https://api.fortnitetracker.com/v1/profile/` + `pc` + "/" + `${args[0]}`,
    method: 'GET',
    headers: headers
  }

  request(options, function (error, response, body) {
    let info = JSON.parse(body);

    let LifeTime = "";
    let Solo = "";
    let Duo = "";
    let Squad = "";

    for(let currentStatIndex = 0; currentStatIndex < info.lifeTimeStats.length; currentStatIndex++) {
        LifeTime += info.lifeTimeStats[currentStatIndex].key + ": " + info.lifeTimeStats[currentStatIndex].value + "\n";
    }

    for(let STATS in info.stats.p2){
        Solo += info.stats.p2[STATS].label + ": " + info.stats.p2[STATS].displayValue + "\n";
    }

    for(let STATS_1 in info.stats.p10){
        Duo += info.stats.p10[STATS_1].label + ": " + info.stats.p10[STATS_1].displayValue + "\n";
    }

    for(let STATS_2 in info.stats.p9){
        Squad += info.stats.p9[STATS_2].label + ": " + info.stats.p9[STATS_2].displayValue + "\n";
    }

    message.channel.send("\n" + "\n" + 
                         "Account Username: " + info.epicUserHandle + "\n" +
                         "Account Platform: " + info.platformNameLong + "\n" +
                         "----------LIFETIME STATS----------" + "\n" + 
                         LifeTime + "\n" +

                         "------------SOLO STATS------------" + "\n" +
                         Solo + "\n" +

                         "------------DUO STATS-------------" + "\n" +
                         Duo + "\n" +

                         "------------SQUAD STATS-----------" + "\n" +
                         Squad + "\n", {code: "asciidoc"});
})
}

module.exports.help = {
    name: "fortnite"
}  