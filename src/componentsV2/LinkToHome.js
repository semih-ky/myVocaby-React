import { Link } from "react-router-dom";

const LinkToHome = () => {
  return (
    <Link to="/home" className="button is-light">
      <span className="icon">
        <i className="fas fa-home"></i>
      </span>
      <span>Home</span>
    </Link>
  );
};
export default LinkToHome;
