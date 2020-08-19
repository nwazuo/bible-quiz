const colors = require("colors");
const emoji = require("node-emoji");
const box = require("boxen");
const { prompt } = require("enquirer");

const optionsArray = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalm",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation"
];

//Generate a random set of before/after questions from options array
const quizGenerator = (optionsArray, questionsCount = 5) => {
  //Generate primitive question object
  let questionPrimitives = [];

  //Pick x random indeces in optionsArray
  let randomIndeces = uniqueNumbers(questionsCount, optionsArray.length);

  //generate primitive questions object
  randomIndeces.forEach(value => {
    let obj;

    //making exceptions for the first and last items since there can be no 'before' before the first item and no 'after' after the last item
    if (value === 0) {
      obj = {
        operator: "after",
        item: optionsArray[value],
        answer: optionsArray[1]
      };
      questionPrimitives.push(obj);
      return;
    } else if (value === optionsArray.length - 1) {
      console.log("got here");
      obj = {
        operator: "before",
        item: optionsArray[value],
        answer: optionsArray[value - 1]
      };
      questionPrimitives.push(obj);
      return;
    } else {
      let beforeOrAfter = ["before", "after"][Math.floor(Math.random() * 2)];
      let answer =
        beforeOrAfter === "before"
          ? optionsArray[value - 1]
          : optionsArray[value + 1];

      obj = {
        operator: beforeOrAfter,
        item: optionsArray[value],
        answer
      };
      questionPrimitives.push(obj);
    }
  });
  return questionPrimitives;
};

//function to generate array(user-defined length) of unique numbers between zero(inclusive) and given number(exclusive)
function uniqueNumbers(length, max) {
  let result = [];

  let randomValue = Math.floor(Math.random() * max);
  let arrayFillCount = 0;
  // console.log(randomValue);
  while (arrayFillCount < length) {
    if (!result.includes(randomValue)) {
      result.push(randomValue);
      arrayFillCount++;
    }
    randomValue = Math.floor(Math.random() * max);
  }

  // console.log(result);
  return result;
}

//function to randomize an array (in place)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const ask = async (questionPrimitives, counter = 0) => {
  if (counter >= 5) {
    // console.log("We got here".bold.rainbow);
    return;
  }

  const { operator, item, answer } = questionPrimitives[counter];

  let itemAnswer = "";

  //randomize result array (maka ndi expo!)
  const randomizedArray = optionsArray.slice(0);
  shuffleArray(randomizedArray);

  const questionsObject = {
    type: "autocomplete",
    name: `${operator}-${item}`,
    message: `What book comes ${operator.yellow} ${item.magenta.bold}`,
    choices: randomizedArray,
    limit: 3,
    footer: () =>
      "\n" +
      emoji.get("information_source").bold.brightMagenta +
      ": start typing to see suggestions".brightMagenta.italic
  };
  const response = await prompt(questionsObject);

  if (response[`${operator}-${item}`] === answer) {
    console.log(
      "Correct Answer".green.bold +
        emoji.get("heavy_check_mark").white +
        ` :${answer.bold.blue} comes ${operator} ${item.bold.white}`
    );
  } else {
    console.log(
      "Wrong Answer".red.bold +
        emoji.get("x") +
        `  :${answer.bold.blue} comes ${operator} ${item.bold.white}`
    );
  }

  return ask(questionPrimitives, counter + 1);
};

let bibleQuiz = quizGenerator(optionsArray);

// console.log(bibleQuiz);

ask(bibleQuiz);

// console.log("Nope".red.bold);
// console.log("Emoji coming through with " + emoji.get("book").red);
// console.log(
//   box("New Emoji Box Coming Through for yall".red, {
//     padding: 1,
//     margin: 1,
//     borderStyle: "double",
//     float: "center"
//   })
// );
