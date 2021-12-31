import { useSearch } from "../../../contextV2/SearchProvider";
import { useWords } from "../../../contextV2/WordsProvider";

const SearchFooter = ({ modalHandler }) => {
  const { error, isLoading } = useWords();
  const { saveHandler, choosenWordId, results } = useSearch();

  const saveButton = async () => {
    if (results.length === 0) return;
    if (!choosenWordId) return;
    if (error) return;
    await saveHandler();
    modalHandler();
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
      <button onClick={modalHandler} className="button">
        Cancel
      </button>
      {error && <p className="help is-danger">{error.message}</p>}
    </footer>
  );
};
export default SearchFooter;
