import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizSummary = ({ correctNumber, wrongNumber, setIsStart }) => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    if (correctNumber > wrongNumber) {
      setMessage("Well done!");
      setIsSuccess(true);
    } else {
      setMessage("You need to do more practise!");
      setIsSuccess(false);
    }
  }, []);

  const restartHandler = () => {
    setIsStart(false);
  };

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
        <div className="hero-body">
          <div className="">
            <p className="title">Quiz Summary</p>
            <p className="subtitle subtitle-custom">
              <strong>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Correct</span>
                  <span className="is-family-monospace is-size-4">
                    : {correctNumber}
                  </span>
                </span>
              </strong>
            </p>
            <p className="subtitle">
              <strong>
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-times"></i>
                  </span>
                  <span>Wrong</span>
                  <span className="is-family-monospace is-size-4">
                    : {wrongNumber}
                  </span>
                </span>
              </strong>
            </p>
            <p className="subtitle">{message && message}</p>
            <div className="field is-grouped">
              <p className="control">
                <button onClick={restartHandler} className="button is-light">
                  <span className="icon">
                    <i className="fas fa-sync-alt"></i>
                  </span>
                  <span>Restart</span>
                </button>
              </p>
              <p className="control">
                <Link to="/home" className="button is-light">
                  <span className="icon">
                    <i className="fas fa-home"></i>
                  </span>
                  <span>Home</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default QuizSummary;
