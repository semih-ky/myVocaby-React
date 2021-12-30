import { QuizPageProvider } from "../../contextV2/QuizPageProvider";
import { QuizProblemsProvider } from "../../contextV2/QuizProblemsProvider";
import { QuizProvider } from "../../contextV2/QuizProvider";
import Navbar from "../../componentsV2/Navbar/index";
import QuizSetup from "./QuizSetup";

const Quiz = () => {
  return (
    <>
      <Navbar />
      <QuizPageProvider>
        <QuizProvider>
          <QuizSetup />
          <QuizProblemsProvider>
            <QuizProblems />
            <QuizSummary />
          </QuizProblemsProvider>
        </QuizProvider>
      </QuizPageProvider>
    </>
  );
};
export default Quiz;
