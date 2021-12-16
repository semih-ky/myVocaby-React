import { useState } from "react/cjs/react.development";
import Navbar from "../../components/Navbar";
import QuizProblems from "../../components/QuizProblems";
import { dummyData } from "../../components/testData";

const Quiz = () => {
  const [isStart, setIsStart] = useState(false);
  const [numberOfQuestion, setNumberOfQuestion] = useState(5);

  const questionNumberHandler = (e) => {
    setNumberOfQuestion(parseInt(e.target.value));
  };

  const startHandler = () => {
    setIsStart(true);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {isStart ? (
          <QuizProblems numberOfQuestion={numberOfQuestion} words={dummyData} />
        ) : (
          <>
            <header>
              <p className="has-text-centered is-size-3">
                <strong>Quiz</strong>
              </p>
            </header>
            <section className="question-select">
              <div className="field">
                <label className="label">Select Number of Questions</label>
                <div className="control">
                  <div className="select select-custom">
                    <select
                      onChange={questionNumberHandler}
                      className="select-custom"
                    >
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                      <option value={15}>15 Questions</option>
                      <option value={20}>20 Questions</option>
                    </select>
                  </div>
                  <p className="help">
                    You must have <strong>at least 5 </strong>word cards.
                  </p>
                </div>
                <button
                  onClick={startHandler}
                  className="button button-custom is-primary"
                  type="button"
                >
                  Start
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};
export default Quiz;
