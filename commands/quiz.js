const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
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

  fetch("https://opentdb.com/api_token.php?command=request")
    .then((res) => res.json())
    .then((token) => {
      try {
        fetch(`https://opentdb.com/api.php?amount=50&token=${token.token}`)
          .then(async (res) => res.json())
          .then(async (d) => {
            const item =
              d.results[Math.floor(Math.random() * d.results.length)];
            console.log(item);

            item.incorrect_answers.push(item.correct_answer);
            const arr = item.incorrect_answers;
            console.log(shuffle(item.incorrect_answers));
            const filter = (answer) =>
              answer.content.toLowerCase() ===
              item.correct_answer.toLowerCase();

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
              .addField(
                "Question:",
                `${item.question.replace(/(?:\&quot\;)/g, '"')}`
              )
              .addField(
                "Choices: ",
                `${shuffle(item.incorrect_answers)
                  .toString()
                  .replace(",", ", ")}`
              )
              .setFooter("Powered by Open Trivia DB API.");
            await message.channel.send(questionEmbed).then(() => {
              message.channel
                .awaitMessages(filter, options)
                .then((collected) => {
                  const winnerMessage = collected.first();
                  return message.channel.send({
                    embed: new Discord.RichEmbed()
                      .setTimestamp(moment.utc().format())
                      .setAuthor(
                        `Winner: ${winnerMessage.author.tag}`,
                        winnerMessage.author.displayAvatarURL
                      )
                      .setTitle(`Correct Answer: \`${item.correct_answer}\``)
                      .setFooter(
                        `Question: ${item.question.replace(
                          /(?:\&quot\;)/g,
                          '"'
                        )}`
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
                .catch((err) => {
                  console.log(err);
                  return message.channel.send({
                    embed: new Discord.RichEmbed()
                      .setTitle(
                        "**TIMEOUT!!**",
                        message.author.displayAvatarURL
                      )
                      .addField(
                        `Question:`,
                        `${item.question.replace(/(?:\&quot\;)/g, '"')}`
                      )
                      .addField(
                        `Correct Answer is:`,
                        `\`${item.correct_answer}\``
                      )
                      .setFooter("Run the command again to start a new quiz!")
                      .setTimestamp(moment.utc().format())
                      .setColor(
                        `${
                          message.guild.me.displayHexColor !== "#000000"
                            ? message.guild.me.displayHexColor
                            : 0xffffff
                        }`
                      ),
                  });
                });
            });
          });
      } catch (err) {
        console.log(err);
      }
    });
};
module.exports.help = {
  name: "quiz",
};
