export const qz = {
  generateRandomInt(maxValue) {
    let max = maxValue || 1;
    return Math.floor(Math.random() * max);
  },

  generateRandomSort(max, dataLength) {
    if (max > dataLength) max = dataLength;
    let randomSort = [];

    while (randomSort.length !== max) {
      let randNumb = this.generateRandomInt(dataLength);

      if (!randomSort.includes(randNumb)) {
        randomSort.push(randNumb);
      }
    }
    return randomSort;
  },

  generateQuestionType() {
    let typeId = this.generateRandomInt(2);

    let types = ["word", "definition"];

    return {
      questionType: types[typeId],
      answerType: types[0] === types[typeId] ? types[1] : types[0],
    };
  },

  getQuizData(words, sort, questionNumber) {
    if (questionNumber >= sort.length) {
      return null;
    }

    const types = this.generateQuestionType();

    const word = words[sort[questionNumber]];

    const correctAnswerId = word.wordId;

    let answersArr = new Array(4).fill(null);

    const answerPosition = this.generateRandomInt(4);

    let question;
    if (types.questionType === "word") {
      question = word.word;
    }

    if (types.questionType === "definition") {
      question = word.definitions[0];
    }

    let choosenAnswers = [];
    let answers = answersArr.map((_, index) => {
      let answer;
      if (index === answerPosition) {
        if (types.answerType === "word") {
          answer = word.word;
        }

        if (types.answerType === "definition") {
          answer = word.definitions[0];
        }

        return {
          answerId: correctAnswerId,
          answer: answer,
        };
      }

      let j;
      do {
        j = this.generateRandomInt(words.length);
      } while (j === sort[questionNumber] || choosenAnswers.includes(j));

      choosenAnswers.push(j);

      if (types.answerType === "word") {
        answer = words[j].word;
      }

      if (types.answerType === "definition") {
        answer = words[j].definitions[0];
      }

      return {
        answerId: words[j].wordId,
        answer: answer,
      };
    });

    return {
      question,
      answers,
      correctAnswerId,
    };
  },

  getUniqueQuizWords(words) {
    return words.filter(
      (word, index, self) =>
        index === self.findIndex((w) => w.word === word.word)
    );
  },
};
