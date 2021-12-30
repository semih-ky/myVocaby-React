const CorrectNumber = ({ correctAnswer }) => {
  return (
    <p className="subtitle subtitle-custom">
      <strong>
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-check"></i>
          </span>
          <span>Correct</span>
          <span className="is-family-monospace is-size-4">
            : {correctAnswer}
          </span>
        </span>
      </strong>
    </p>
  );
};
export default CorrectNumber;
