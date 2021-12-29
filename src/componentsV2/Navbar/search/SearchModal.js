import SearchBody from "./SearchBody";
import SearchFooter from "./SearchFooter";
import { SearchProvider } from "../../../contextV2/SearchProvider";

const SearchModal = ({ modalHandler }) => {
  return (
    <SearchProvider>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Search Word</p>
            <button
              onClick={modalHandler}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <SearchBody />
          <SearchFooter modalHandler={modalHandler} />
        </div>
      </div>
    </SearchProvider>
  );
};
export default SearchModal;
