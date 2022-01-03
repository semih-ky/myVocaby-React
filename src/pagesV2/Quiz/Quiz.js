import { QuizPageProvider } from "../../contextV2/QuizPageProvider";
import { QuizProvider } from "../../contextV2/QuizProvider";
import Navbar from "../../componentsV2/Navbar/Navbar";
import { useWords } from "../../contextV2/WordsProvider";
import QuizPage from "./QuizPage";

const Quiz = () => {
  const { words } = useWords();
  console.log(words);
  return (
    <>
      <Navbar />
      <QuizPageProvider>
        <QuizProvider>
          <QuizPage />
        </QuizProvider>
      </QuizPageProvider>
    </>
  );
};
export default Quiz;
