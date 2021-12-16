import { useEffect, useState, useRef } from "react";
import { qz } from "../util/quiz.util";
import QuizSummary from "./QuizSummary";

const VIEWPORT_WIDTH = window.visualViewport.width;

const QuizProblems = ({ numberOfQuestion, words }) => {
  const questionsSort = useRef(
    qz.generateRandomSort(numberOfQuestion, words.length)
  );
  const userCorrect = useRef(0);
  const userWrong = useRef(0);

  const [isLock, setIsLock] = useState(false);

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);

  const [correctAnswerId, setCorrectAnswerId] = useState("");
  const [userSelectId, setUserSelectId] = useState("");

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const quizData = qz.getQuizData(
      words,
      questionsSort.current,
      questionNumber
    );

    setQuestion(quizData.question);
    setAnswers(quizData.answers);
    setCorrectAnswerId(quizData.correctAnswerId);

    if (isLock) setIsLock(false);
  }, [questionNumber]);

  const userSelectHandler = (e) => {
    if (isLock) return;

    const userChoice = e.currentTarget.id;

    setIsLock(true);
    setUserSelectId(userChoice);

    if (userChoice === correctAnswerId) {
      userCorrect.current += 1;
    } else {
      userWrong.current += 1;
    }
  };

  const nextHandler = () => {
    if (questionNumber + 1 < numberOfQuestion) {
      setUserSelectId("");
      setQuestionNumber((oldState) => oldState + 1);
      return;
    }

    if (questionNumber + 1 === numberOfQuestion) {
      setIsFinished(true);
    }
  };

  return (
    <>
      {isFinished ? (
        <QuizSummary
          correctNumber={userCorrect.current}
          wrongNumber={userWrong.current}
        />
      ) : (
        <section className="quiz-container">
          <div
            className={VIEWPORT_WIDTH <= 400 ? "box-custom" : "box box-custom"}
          >
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

            <div className="answers-container">
              {answers.map((answer) => (
                <div
                  onClick={userSelectHandler}
                  className={
                    userSelectId === answer.answerId
                      ? userSelectId === correctAnswerId
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
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-outlined is-info">
                  <span className="icon">
                    <i className="fas fa-sync-alt"></i>
                  </span>
                  <span>Restart</span>
                </button>
              </p>
              <p className="control">
                <button
                  onClick={nextHandler}
                  className="button is-outlined is-link"
                >
                  <span>
                    {questionNumber + 1 === numberOfQuestion
                      ? "Finish"
                      : "Next"}
                  </span>
                  <span className="icon">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default QuizProblems;
