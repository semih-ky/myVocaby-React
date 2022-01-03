import { Link } from "react-router-dom";

const VIEWPORT_WIDTH = window.visualViewport.width; // 1024

const SearchWord = () => {
  return (
    <Link to="/search" className="navbar-item">
      <span className="icon-text">
        <span className="icon">
          <i className="fas fa-search"></i>
        </span>
        <span>Search Word</span>
      </span>
    </Link>
  );
};
export default SearchWord;
