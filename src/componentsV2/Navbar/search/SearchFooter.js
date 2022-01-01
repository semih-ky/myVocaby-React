import { useSearch } from "../../../contextV2/SearchProvider";
import { useSaveWord } from "../../../contextV2/SaveProvider";

const SearchFooter = ({ modalHandler }) => {
  const { results } = useSearch();

  const { choosenWordId, isLoading, error, saveWord } = useSaveWord();

  const saveButton = async () => {
    if (results.length === 0) return;
    if (!choosenWordId) return;
    if (error) return;
    const isOK = await saveWord();
    if (isOK) modalHandler();
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
