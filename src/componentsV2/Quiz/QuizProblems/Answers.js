import { useQuizPage } from "../../../contextV2/QuizPageProvider";
import { useQuizProblems } from "../../../contextV2/QuizProblemsProvider";

const Answers = () => {
  const { answers, correctAnswerId, checkUserAnswer } = useQuizProblems();

  const { isLock, setIsLock, selectedAnsId, setSelectedAnsId } = useQuizPage();

  const answerHandler = (e) => {
    if (isLock) return;
    const userChoice = e.currentTarget.id;

    setIsLock(true);
    setSelectedAnsId(userChoice);
    checkUserAnswer(userChoice);
  };

  return (
    <div className="answers-container">
      {answers.map((answer) => (
        <div
          onClick={answerHandler}
          className={
            selectedAnsId === answer.answerId
              ? selectedAnsId === correctAnswerId
                ? "answers answer-correct"
                : "answers answer-wrong"
              : "answers"
          }
          id={answer.answerId}
          key={answer.answerId}
        >
          <p>{answer.answer}</p>
        </div>
      ))}
    </div>
  );
};
export default Answers;
