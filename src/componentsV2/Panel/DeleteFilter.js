import { useWords } from "../../contextV2/WordsProvider";
import { useFilters } from "../../contextV2/FiltersProvider";

const DeleteFilter = () => {
  const { filter } = useWords();
  const { delFilter, error, isLoading } = useFilters();

  const deleteHandler = () => {
    delFilter(filter);
  };

  return (
    <>
      <button
        onClick={deleteHandler}
        className={
          isLoading
            ? "button is-danger is-small is-loading delete-filter-custom"
            : "button is-danger is-small delete-filter-custom"
        }
      >
        <span className="icon">
          <i className="fas fa-trash"></i>
        </span>
        <span>Delete Filter</span>
      </button>
      {error && (
        <div className="panel-block">
          <p className="help is-danger delete-filter-custom">{error.message}</p>
        </div>
      )}
    </>
  );
};
export default DeleteFilter;
