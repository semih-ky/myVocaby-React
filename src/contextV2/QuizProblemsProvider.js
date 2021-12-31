import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useQuiz } from "./QuizProvider";
import { qz } from "../utilsV2/quiz.util";

const QuizProblemsContext = createContext(null);

export const QuizProblemsProvider = ({ children }) => {
  const { quizWords, numberOfQuestion } = useQuiz();

  const questionsSort = useRef(
    qz.generateRandomSort(numberOfQuestion, quizWords)
  );
  const userCorrect = useRef(0);
  const userWrong = useRef(0);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswerId, setCorrectAnswerId] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);

  const [isLastQuestion, setIsLastQuestion] = useState(false);

  // const [isFinished, setIsFinished] = useState(false);

  const getQuizData = () =>
    qz.getQuizData(quizWords, questionsSort.current, questionNumber);

  const checkUserAnswer = (id) => {
    if (id === correctAnswerId) {
      userCorrect.current += 1;
    } else {
      userWrong.current += 1;
    }
  };

  const nextQuestion = () => {
    setQuestionNumber((oldState) => oldState + 1);
  };

  useEffect(() => {
    if (questionNumber + 1 === numberOfQuestion) {
      setIsLastQuestion(true);
    }

    const quizData = getQuizData();

    setQuestion(quizData.question);
    setAnswers(quizData.answers);
    setCorrectAnswerId(quizData.correctAnswerId);
  }, [questionNumber]);

  const value = {
    question,
    answers,
    correctAnswerId,
    questionNumber,
    numberOfQuestion,
    isLastQuestion,
    correctAnswer: userCorrect.current,
    wrongAnswer: userWrong.current,
    checkUserAnswer,
    nextQuestion,
  };

  return (
    <QuizProblemsContext.Provider value={value}>
      {children}
    </QuizProblemsContext.Provider>
  );
};

export const useQuizProblems = () => useContext(QuizProblemsContext);
