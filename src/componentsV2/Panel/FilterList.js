import { useFilters } from "../../contextV2/FiltersProvider";
import { useWords } from "../../contextV2/WordsProvider";

const FilterList = ({ panelOpenClose }) => {
  const { filter, changeFilter } = useWords();
  const { filterList } = useFilters();

  const filterHandler = (e) => {
    changeFilter(e.target.id);
    panelOpenClose();
  };

  return (
    <>
      {filterList.map((item) => (
        <a
          key={item}
          id={item}
          onClick={filterHandler}
          className={filter === item ? "panel-block is-active" : "panel-block"}
        >
          <span className="panel-icon">
            <i className="fas fa-folder" aria-hidden="true"></i>
          </span>
          {item}
        </a>
      ))}
    </>
  );
};
export default FilterList;
