const WrongNumber = ({ wrongAnswer }) => {
  return (
    <p className="subtitle">
      <strong>
        <span className="icon-text">
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
          <span>Wrong</span>
          <span className="is-family-monospace is-size-4">: {wrongAnswer}</span>
        </span>
      </strong>
    </p>
  );
};
export default WrongNumber;
