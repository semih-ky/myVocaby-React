import { useEffect } from "react";
import SearchBody from "./SearchBody";
import SearchFooter from "./SearchFooter";
import { useSearch } from "../../../contextV2/SearchProvider";
import { useSaveWord } from "../../../contextV2/SaveProvider";

const SearchModal = ({ modalHandler }) => {
  const { clearSearch } = useSearch();
  const { clearSaveWord } = useSaveWord();

  useEffect(() => {
    return () => {
      clearSearch();
      clearSaveWord();
    };
  }, []);

  return (
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
  );
};
export default SearchModal;
