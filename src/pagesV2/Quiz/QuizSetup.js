import { useQuiz } from "../../contextV2/QuizProvider";
import { useQuizPage } from "../../contextV2/QuizPageProvider";
import Loading from "../../componentsV2/Loading";
import SelectQuestionNumber from "../../componentsV2/Quiz/QuizSetup/SelectQuestionNumber";
import StartButton from "../../componentsV2/Quiz/QuizSetup/StartButton";

const QuizSetup = () => {
  const { isLoading, isEnoughWords } = useQuiz();

  const { isQuizStart } = useQuizPage();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!isQuizStart && (
        <div className="container">
          <header>
            <p className="has-text-centered is-size-3">
              <strong>Quiz</strong>
            </p>
          </header>
          <section className="question-select">
            <div className="field">
              <label className="label">Select Number of Questions</label>
              <SelectQuestionNumber />
              {!isEnoughWords && (
                <p className="help is-danger">You don't have enough words!</p>
              )}
              <StartButton />
            </div>
          </section>
        </div>
      )}
    </>
  );
};
export default QuizSetup;
