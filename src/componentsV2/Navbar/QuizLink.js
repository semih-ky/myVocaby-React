import { Link, useLocation } from "react-router-dom";

const QuizLink = () => {
  const location = useLocation();

  return (
    <Link
      to="/quiz"
      className={
        location.pathname === "/quiz" ? "navbar-item is-active" : "navbar-item"
      }
    >
      <span className="icon-text">
        <span className="icon">
          <i className="fas fa-vial"></i>
        </span>
        <span>Quiz</span>
      </span>
    </Link>
  );
};
export default QuizLink;
