import { createContext, useContext, useState } from "react";

const QuizPageContext = createContext(null);

export const QuizPageProvider = ({ children }) => {
  const [isQuizStart, setIsQuizStart] = useState(false);

  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const [isLock, setIsLock] = useState(false);

  const [selectedAnsId, setSelectedAnsId] = useState("");

  const restartQuiz = () => {
    setIsQuizStart(false);
    setIsQuizFinished(false);
    setSelectedAnsId("");
    setIsLock(false);
  };

  const value = {
    isQuizStart,
    setIsQuizStart,
    isQuizFinished,
    setIsQuizFinished,
    restartQuiz,
    isLock,
    setIsLock,
    selectedAnsId,
    setSelectedAnsId,
  };

  return (
    <QuizPageContext.Provider value={value}>
      {children}
    </QuizPageContext.Provider>
  );
};

export const useQuizPage = () => useContext(QuizPageContext);
