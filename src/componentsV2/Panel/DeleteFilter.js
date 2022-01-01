import { useEffect, useState } from "react";
import { useWords } from "../../contextV2/WordsProvider";
import { useFilters } from "../../contextV2/FiltersProvider";
import { deleteFilter } from "../../utilsV2/fetch.api";

const DeleteFilter = () => {
  const { filter, changeFilter } = useWords();
  const { filterList, setFilterList } = useFilters();

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    if (!filter) return;
    if (error) setError(null);
    setIsLoading(true);

    try {
      const data = await deleteFilter({
        filter: filter,
      });

      let updatedFilterList = filterList.filter((item) => item !== filter);
      setFilterList(updatedFilterList);
      setIsLoading(false);
      changeFilter();
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [filter]);

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
