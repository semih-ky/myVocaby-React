export const qz = {
  generateRandomInt(maxValue) {
    let max = maxValue || 1;
    return Math.floor(Math.random() * max);
  },

  generateRandomSort(max, dataLength) {
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

    const question = word[types.questionType];

    const correctAnswerId = word.wordId;

    let answersArr = new Array(4).fill(null);

    const answerPosition = this.generateRandomInt(4);

    let choosenAnswers = [];
    let answers = answersArr.map((_, index) => {
      if (index === answerPosition) {
        return {
          answerId: correctAnswerId,
          answer: word[types.answerType],
        };
      }

      let j;
      do {
        j = this.generateRandomInt(words.length);
      } while (j === sort[questionNumber] || choosenAnswers.includes(j));

      choosenAnswers.push(j);

      return {
        answerId: words[j].wordId,
        answer: words[j][types.answerType],
      };
    });

    return {
      question,
      answers,
      correctAnswerId,
    };
  },
};
