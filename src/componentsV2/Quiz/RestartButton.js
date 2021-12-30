import { useQuizPage } from "../../contextV2/QuizPageProvider";

const RestartButton = () => {
  const { restartQuiz } = useQuizPage();

  const restartHandler = () => {
    restartQuiz();
  };

  return (
    <button onClick={restartHandler} className="button is-light">
      <span className="icon">
        <i className="fas fa-sync-alt"></i>
      </span>
      <span>Restart</span>
    </button>
  );
};
export default RestartButton;
