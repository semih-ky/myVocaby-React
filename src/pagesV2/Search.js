import { useEffect } from "react";
import SearchBody from "../componentsV2/Navbar/search/SearchBody";
import SearchFooter from "../componentsV2/Navbar/search/SearchFooter";
import { useSearch } from "../contextV2/SearchProvider";
import { useSaveWord } from "../contextV2/SaveProvider";

const VIEWPORT_WIDTH = window.visualViewport.width;

const Search = () => {
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
      <div className="modal-card modal-card-custom">
        <header className="modal-card-head">
          <p className="modal-card-title">Search Word</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <SearchBody />
        <SearchFooter modalHandler={""} />
      </div>
    </div>
  );
};
export default Search;
