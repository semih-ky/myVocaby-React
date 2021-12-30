import { useQuiz } from "../../../contextV2/QuizProvider";

const SelectQuestionNumber = () => {
  const { numOfQstnHandler } = useQuiz();

  const selectHandler = (e) => {
    const val = parseInt(e.target.value);
    numOfQstnHandler(val);
  };

  return (
    <div className="control">
      <div className="select select-custom">
        <select onChange={selectHandler} className="select-custom">
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
  );
};
export default SelectQuestionNumber;
