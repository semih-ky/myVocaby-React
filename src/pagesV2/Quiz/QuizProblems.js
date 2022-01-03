import QuestionHeader from "../../componentsV2/Quiz/QuizProblems/QuestionHeader";
import Answers from "../../componentsV2/Quiz/QuizProblems/Answers";
import NextQuestion from "../../componentsV2/Quiz/QuizProblems/NextQuestion";
import RestartButton from "../../componentsV2/Quiz/RestartButton";

const VIEWPORT_WIDTH = window.visualViewport.width;

const QuizProblems = () => {
  return (
    <div className="container">
      <section className="quiz-container">
        <div
          className={VIEWPORT_WIDTH <= 400 ? "box-custom" : "box box-custom"}
        >
          <QuestionHeader />
          <Answers />
          <div className="field is-grouped">
            <p className="control">
              <RestartButton />
            </p>
            <p className="control">
              <NextQuestion />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default QuizProblems;
