import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useWords } from "./WordsProvider";
import { qz } from "../utilsV2/quiz.util";

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const { words } = useWords();

  const [quizWords, setQuizWords] = useState([]);
  console.log(quizWords);

  const [numberOfQuestion, setNumberOfQuestion] = useState(5);

  const [isEnoughWords, setIsEnoughWords] = useState(true);

  const checkEnoughWords = (val) => quizWords.length >= val;

  const numOfQstnHandler = (value) => {
    if (isNaN(value)) return;
    setNumberOfQuestion(value);
    setIsEnoughWords(checkEnoughWords(value));
  };

  useEffect(() => {
    if (words.length < 0) return;
    const qzWords = qz.getUniqueQuizWords(words);
    setQuizWords(qzWords);
    const isEnough = qzWords.length >= numberOfQuestion;
  }, [words]);

  // useEffect(() => {
  //   setIsEnoughWords(checkEnoughWords());
  // }, [numberOfQuestion, quizWords]);

  const value = {
    quizWords,
    numberOfQuestion,
    numOfQstnHandler,
    isEnoughWords,
    setIsEnoughWords,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => useContext(QuizContext);
