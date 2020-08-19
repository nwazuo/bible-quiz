const boxen = require("boxen");
const { Confirm, Input, prompt, AutoComplete } = require("enquirer");

const run = async () => {
  const response = await prompt([
    {
      type: "autocomplete",
      name: "gender",
      message: "What is your gender",
      choices: ["male", "female"],
      result: function(answer) {
        return "Answer is " + answer + something;
      }
    },
    {
      type: "autocomplete",
      name: "state",
      message: "What's your state?",
      choices: ["Abia", "Imo"]
    }
  ]);

  console.log(response);
  return response;
};

// run()
//   .then(response => {
//     console.log("First response came through as ", response);
//     return run();
//   })
//   .then(response => {
//     console.log("Second response came through as ", response);
//   });

let answers = [];

const recurse = async counter => {
  if (counter >= 5) {
    console.log(answers);
    return;
  }
  const response = await prompt({
    type: "autocomplete",
    choices: ["fine", "not fine"],
    name: "you",
    message: "how are you?"
  });
  answers.push(response);
  console.log("You answered ", response);
  return recurse(counter + 1);
};

recurse(0);
// let name;

// let ask = new Input({
//   message: "What's your name?"
// });

// ask
//   .run()
//   .then(answer => {
//     console.log(
//       boxen(`Hello ${answer} welcome to Chizo's CLI`, {
//         padding: 1,
//         margin: 1,
//         borderStyle: "double",
//         float: "center",
//         align: "center",
//         borderColor: "cyan"
//       })
//     );
//   })
//   .catch(console.log);
