import { useEffect, useState } from "react";
import { useCardProvider } from "../../components/context/CardsProvider";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import QuizProblems from "../../components/QuizProblems";
import { qz } from "../../util/quiz.util";

const Quiz = () => {
  const { words, isLoading } = useCardProvider();

  const [numberOfQuestion, setNumberOfQuestion] = useState(5);
  const [errMsg, setErrMsg] = useState("");
  const [btnDisable, setBtnDisable] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [quizWords, setQuizWords] = useState(null);

  useEffect(() => {
    if (isLoading) return;
    const qzWords = qz.getUniqueQuizWords(words);
    setQuizWords(qzWords);
    if (qzWords.length >= numberOfQuestion) {
      setBtnDisable(false);
    }
  }, [isLoading]);

  const questionNumberHandler = (e) => {
    const val = parseInt(e.target.value);
    if (isNaN(val)) return;

    if (val > quizWords.length) {
      setBtnDisable(true);
      setErrMsg("You don't have enough words!");
      return;
    }
    setBtnDisable(false);
    setErrMsg("");
    setNumberOfQuestion(val);
  };

  const startHandler = () => {
    if (isNaN(numberOfQuestion)) return;

    setIsStart(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      {/* <div className="container"> */}
      {isStart ? (
        <QuizProblems
          numberOfQuestion={numberOfQuestion}
          words={quizWords}
          setIsStart={setIsStart}
        />
      ) : (
        <>
          <div className="container">
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
                    You must have <strong>at least 5 unique </strong>words.
                  </p>
                </div>
                {errMsg && <p className="help is-danger">{errMsg}</p>}
                <button
                  onClick={startHandler}
                  className="button button-custom is-primary"
                  type="button"
                  disabled={btnDisable}
                >
                  Start
                </button>
              </div>
            </section>
          </div>
        </>
      )}
      {/* </div> */}
    </>
  );
};
export default Quiz;
