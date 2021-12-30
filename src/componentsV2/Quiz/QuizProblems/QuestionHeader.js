import { useQuizProblems } from "../../../contextV2/QuizProblemsProvider";
import { useQuiz } from "../../../contextV2/QuizProvider";

const QuestionHeader = () => {
  const { numberOfQuestion } = useQuiz();
  const { question, questionNumber } = useQuizProblems();
  return (
    <>
      <p className="is-size-4">
        <strong>
          <span>{questionNumber + 1}</span> <span>/</span>{" "}
          <span>{numberOfQuestion}</span>
        </strong>
      </p>
      <div className="break-line"></div>
      <p className="is-size-5 has-text-centered">
        <strong>{question}</strong>
      </p>
    </>
  );
};
export default QuestionHeader;
