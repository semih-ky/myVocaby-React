import { useState } from "react";

const DUMMY_FILTERS = [
  {
    id: "1",
    name: "school",
  },
  {
    id: "2",
    name: "house",
  },
  {
    id: "3",
    name: "office",
  },
];

const Panel = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [choosenFilter, setChoosenFilter] = useState("");

  const filterOpenHandler = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const filterHandler = (e) => {
    setChoosenFilter(e.target.id);
    setIsFilterOpen(false);
  };

  const removeFilter = () => {
    setChoosenFilter("");
  };

  return (
    <nav className="panel panel-custom">
      <p className="panel-block">
        <span onClick={filterOpenHandler} id="panelHeadingName">
          <strong>Filters</strong>
          <span className="icon">
            <i
              className={`fas fa-${
                isFilterOpen ? "chevron-up" : "chevron-down"
              }`}
            ></i>
          </span>
        </span>
        {choosenFilter && (
          <>
            <span className="tag is-link is-medium">
              {choosenFilter}
              <button
                onClick={removeFilter}
                className="delete is-medium"
              ></button>
            </span>
            <button className="button is-danger is-small delete-filter-custom">
              <span className="icon">
                <i className="fas fa-trash"></i>
              </span>
              <span>Delete Filter</span>
            </button>
          </>
        )}
      </p>
      <div
        className={isFilterOpen ? "block-display-custom" : "no-display-custom"}
      >
        <div className="panel-block">
          <button className="button is-warning" id="filterBtn" type="button">
            <span className="icon" id="folderPlusIcon">
              <i className="fas fa-folder-plus"></i>
            </span>
            Create New Filter
          </button>
        </div>
        {DUMMY_FILTERS.map((filter) => (
          <a
            key={filter.id}
            id={filter.name}
            onClick={filterHandler}
            className="panel-block is-active"
          >
            <span className="panel-icon">
              <i className="fas fa-folder" aria-hidden="true"></i>
            </span>
            {filter.name}
          </a>
        ))}
      </div>
    </nav>
  );
};
export default Panel;
