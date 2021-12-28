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
      Quiz
    </Link>
  );
};
export default QuizLink;
