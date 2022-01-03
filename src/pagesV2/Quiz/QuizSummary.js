import { useEffect, useState } from "react";
import { useQuizPage } from "../../contextV2/QuizPageProvider";
import { useQuizProblems } from "../../contextV2/QuizProblemsProvider";

import CorrectNumber from "../../componentsV2/Quiz/QuizSummary/CorrectNumber";
import WrongNumber from "../../componentsV2/Quiz/QuizSummary/WrongNumber";

import LinkToHome from "../../componentsV2/LinkToHome";
import RestartButton from "../../componentsV2/Quiz/RestartButton";

const QuizSummary = () => {
  const { correctAnswer, wrongAnswer } = useQuizProblems();

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    if (correctAnswer > wrongAnswer) {
      setMessage("Well done!");
      setIsSuccess(true);
    } else {
      setMessage("You need to do more practise!");
      setIsSuccess(false);
    }
  }, []);

  return (
    <div className="quiz-summary">
      <section
        className={
          isSuccess === null
            ? "hero is-link is-fullheight"
            : isSuccess
            ? "hero is-success is-fullheight"
            : "hero is-danger is-fullheight"
        }
      >
        <div className="hero-body hero-body-custom">
          <p className="title">Quiz Summary</p>
          <CorrectNumber correctAnswer={correctAnswer} />
          <WrongNumber wrongAnswer={wrongAnswer} />
          <p className="subtitle">{message && message}</p>
          <div className="field is-grouped">
            <p className="control">
              <RestartButton />
            </p>
            <p className="control">
              <LinkToHome />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default QuizSummary;
