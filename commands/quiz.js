// const Discord = require('discord.js');
// const quiz = [
//   { q: "What color is the sky?", a: ["no color", "invisible"] },
//   { q: "Name a soft drink brand.", a: ["pepsi", "coke", "rc", "7up", "sprite", "mountain dew"] },
//   { q: "Name a programming language.", a: ["actionscript", "coffeescript", "c", "c++", "basic", "python", "perl", "javascript", "dotnet", "lua", "crystal", "go", "d", "php", "ruby", "rust", "dart", "java", "javascript"] },
//   { q: "Who's a good boy?", a: ["you are", "sync"] },
//   { q: "Who created me?", a: ["sync", "sync#0666"]},
//   { q: "What programming language am I made in?", a: ["javascript"] },
//   { q: "Name the seventh planet from the Sun.", a: ["uranus"] },
//   { q: "Name the World's biggest island.", a: ["greenland",] },
//   { q: "What's the World's longest river?", a: ["amazon", "amazon river"] },
//   { q: "Name the World's largest ocean.", a: ["pacific", "pacific ocean"] },
//   { q: "Name one of the three primary colors.", a: ["blue", "red", "yellow"] },
//   { q: "How many colors are there in a rainbow?", a: ["7", "seven"] },
//   { q: "What do you call a time span of one thousand years?", a: ["millennium"] },
//   { q: "How many squares are there on a chess board?", a: ["64", "sixty four"] },
//   { q: "How many degrees are found in a circle?", a: ["360", "360 degrees", "three hundred sixty"] },
//   { q: "The Dewey Decimal system is used to categorize what?", a: ["books"] },
//   { q: "How many points does a compass have?", a: ["32", "thirty two"] },
//   { q: "How many strings does a cello have?", a: ["4", "four"] },
//   { q: "How many symphonies did Beethoven compose?", a: ["9", "nine"] },
//   { q: "How many lines should a limerick have?", a: ["5", "five"] },
//   { q: "What is the most basic language Microsoft made?", a: ["visual basic"] },
//   { q: "What is the most complicated language?", a: ["binary"] },
//   { q: "'OS' computer abbreviation usually means?", a: ["operating system"] }
// ];
// const options = {
//   max: 1,
//   time: 300000,
//   errors: ["time"],
// };

// module.exports.run = async (bot, message, args) => {

//   const item = quiz[Math.floor(Math.random() * quiz.length)];
//   await message.channel.send(item.q);
//   try {
//     const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
//     const winnerMessage = collected.first();
//     return message.channel.send({embed: new Discord.RichEmbed()
//                                  .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
//                                  .setTitle(`Correct Answer: \`${winnerMessage.content}\``)
//                                  .setFooter(`Question: ${item.q}`)
//                                  .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`)
//                                 })
//   } catch (_) {
//     if(!await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options))
//     return message.channel.send({embed: new Discord.RichEmbed()
//                                  .setAuthor("Wrong Answer!")
//                                  .setFooter(`Question: ${item.q}`)
//                                 })
//   }
// }
// module.exports.help = {
// name: "quiz"
// }

const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
  let difficultyQuery = args[0];
  function shuffle(array) {
    var ctr = array.length,
      temp,
      index;

    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = array[ctr];
      array[ctr] = array[index];
      array[index] = temp;
    }
    return array;
  }
  const options = {
    max: 1,
    time: 30000,
    errors: ["time"],
  };

  const token = fetch("https://opentdb.com/api_token.php?command=request")
  .then(res => res.json())
  .then(token => {return token.token}) 

  try {
    fetch(
      `https://opentdb.com/api.php?amount=50&token=${token}`
    )
      .then(async (res) => res.json())
      .then(async (d) => {
        const item = d.results[Math.floor(Math.random() * d.results.length)];
        async function sendData(){
          
          console.log(item);
          
          item.incorrect_answers.push(item.correct_answer);
          const arr = item.incorrect_answers;
          console.log(shuffle(item.incorrect_answers));
          const filter = (answer) => answer.content.toLowerCase() === item.correct_answer.toLowerCase();
  
          const questionEmbed = new Discord.RichEmbed()
            .setTitle(`**Category: ${item.category}**`)
            .setColor("#69c")
            .setTimestamp(moment.utc().format())
            .addField("Difficulty", item.difficulty, true)
            .addField(
              "Time Provided:",
              `${Math.floor((options.time / 1000) % 60)}s`,
              true
            )
            .addField("Type", item.type, true)
            .addField("Question:", `${item.question.replace(/(?:\&quot\;)/g, '"')}`)
            .addField(
              "Choices: ",
              `${shuffle(item.incorrect_answers).toString().replace(",", ", ")}`
            )
            .setFooter("Powered by Open Trivia DB API.");
          await message.channel.send(questionEmbed).then(() => {
            message.channel
              .awaitMessages(filter, options)
              .then(collected =>    {      
              const winnerMessage = collected.first();
              return message.channel.send({
                embed: new Discord.RichEmbed()
                  .setAuthor(
                    `Winner: ${winnerMessage.author.tag}`,
                    winnerMessage.author.displayAvatarURL
                  )
                  .setTitle(`Correct Answer: \`${item.correct_answer}\``)
                  .setFooter(
                    `Question: ${item.question.replace(/(?:\&quot\;)/g, '"')}`
                  )
                  .setColor(
                    `${
                      message.guild.me.displayHexColor !== "#000000"
                        ? message.guild.me.displayHexColor
                        : 0xffffff
                    }`
                  ),
              });
            })
              .catch((err) => console.log(err))
          });
        }

        if(difficultyQuery.toLowerCase() === "random" || !difficultyQuery){
          sendData()
        } else {
        item.filter(d => d.difficulty.toLowerCase() === difficultyQuery.toLowerCase())
        sendData()
        }
           
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports.help = {
  name: "quiz",
};
