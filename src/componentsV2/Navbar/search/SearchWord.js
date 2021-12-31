import { useState } from "react";
import SearchModal from "./SearchModal";

const SearchWord = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const modalHandler = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <div className="navbar-item">
      <div className="buttons">
        <button onClick={modalHandler} className="button is-link is-inverted">
          <span className="icon">
            <i className="fas fa-search"></i>
          </span>
          <strong>Search Word</strong>
        </button>
        {isModalActive && <SearchModal modalHandler={modalHandler} />}
      </div>
    </div>
  );
};
export default SearchWord;
