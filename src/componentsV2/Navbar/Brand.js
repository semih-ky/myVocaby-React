import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Link
      to="/home"
      className="navbar-item is-size-4 is-family-monospace has-text-warning"
    >
      MyVocaby
    </Link>
  );
};
export default Brand;
