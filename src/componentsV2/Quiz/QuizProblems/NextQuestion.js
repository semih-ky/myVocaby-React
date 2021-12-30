import { useQuizPage } from "../../../contextV2/QuizPageProvider";
import { useQuizProblems } from "../../../contextV2/QuizProblemsProvider";

const NextQuestion = () => {
  const { nextQuestion, isLastQuestion } = useQuizProblems();
  const { isLock, setIsLock, setSelectedAnsId, setIsQuizFinished } =
    useQuizPage();

  const nextHandler = () => {
    if (!isLock) return;
    setIsLock(false);
    if (!isLastQuestion) {
      setSelectedAnsId("");
      nextQuestion();
      return;
    }
    if (isLastQuestion) {
      setIsQuizFinished(true);
    }
  };

  return (
    <button
      disabled={!isLock}
      onClick={nextHandler}
      className="button is-outlined is-link"
    >
      <span>{isLastQuestion ? "Finish" : "Next"}</span>
      <span className="icon">
        <i className="fas fa-chevron-right"></i>
      </span>
    </button>
  );
};
export default NextQuestion;
