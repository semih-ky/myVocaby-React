import { createContext, useState, useEffect, useContext } from "react";
import { useWords } from "./WordsProvider";
import qz from "../utilsV2/quiz.util";

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const { words } = useWords();

  const [quizWords, setQuizWords] = useState([]);

  const [numberOfQuestion, setNumberOfQuestion] = useState(5);

  const [isEnoughWords, setIsEnoughWords] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const checkEnoughWords = () => quizWords.length >= numberOfQuestion;

  const numOfQstnHandler = (value) => {
    if (isNaN(value)) return;
    setNumberOfQuestion(value);
  };

  useEffect(() => {
    if (words.length === 0) return;
    setIsLoading(true);
    const qzWords = qz.getUniqueQuizWords(words);
    setQuizWords(qzWords);
    setIsEnoughWords(checkEnoughWords());
    setIsLoading(false);
  }, [words]);

  useEffect(() => {
    setIsEnoughWords(checkEnoughWords());
  }, [numberOfQuestion]);

  const value = {
    quizWords,
    numberOfQuestion,
    numOfQstnHandler,
    isEnoughWords,
    isLoading,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => useContext(QuizContext);
