import { useSearch } from "../../../contextV2/SearchProvider";
import { useSaveWord } from "../../../contextV2/SaveProvider";
import { Link } from "react-router-dom";

const SearchFooter = () => {
  const { results } = useSearch();

  const { choosenWordId, isLoading, error, saveWord } = useSaveWord();

  const saveButton = () => {
    if (results.length === 0) return;
    if (!choosenWordId) return;
    if (error) return;
    saveWord();
  };

  return (
    <footer className="modal-card-foot">
      <button
        onClick={saveButton}
        className={
          error
            ? "button is-danger"
            : isLoading
            ? "button is-success is-loading"
            : "button is-success"
        }
      >
        {error ? "Failed" : "Save"}
      </button>
      <Link to="/home" className="button">
        Cancel
      </Link>
      {error && <p className="help is-danger">{error.message}</p>}
    </footer>
  );
};
export default SearchFooter;
