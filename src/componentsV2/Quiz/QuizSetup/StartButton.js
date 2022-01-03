import { useQuizPage } from "../../../contextV2/QuizPageProvider";
import { useQuiz } from "../../../contextV2/QuizProvider";

const StartButton = () => {
  const { setIsQuizStart } = useQuizPage();

  const { quizWords, isEnoughWords, setIsEnoughWords, numberOfQuestion } =
    useQuiz();

  const startHandler = () => {
    if (isNaN(numberOfQuestion)) return;
    if (!isEnoughWords) return;
    if (quizWords.length < numberOfQuestion) {
      setIsEnoughWords(false);
      return;
    }
    setIsQuizStart(true);
  };

  return (
    <button
      onClick={startHandler}
      className="button button-custom is-primary"
      type="button"
      disabled={!isEnoughWords}
    >
      Start
    </button>
  );
};
export default StartButton;
