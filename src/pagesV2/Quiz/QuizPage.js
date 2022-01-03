import { QuizProblemsProvider } from "../../contextV2/QuizProblemsProvider";
import { useQuiz } from "../../contextV2/QuizProvider";
import { useQuizPage } from "../../contextV2/QuizPageProvider";
import { useWords } from "../../contextV2/WordsProvider";
import Loading from "../../componentsV2/Loading";
import QuizSetup from "./QuizSetup";
import QuizProblems from "./QuizProblems";
import QuizSummary from "./QuizSummary";

const QuizPage = () => {
  const { words } = useWords();
  console.log(words);

  const { isLoading } = useQuiz();

  const { isQuizStart, isQuizFinished } = useQuizPage();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isQuizStart ? (
        <QuizProblemsProvider>
          {isQuizFinished ? <QuizSummary /> : <QuizProblems />}
        </QuizProblemsProvider>
      ) : (
        <QuizSetup />
      )}
    </>
  );
};
export default QuizPage;
