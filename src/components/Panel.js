import { useState } from "react";
import { fetchData } from "../util/util";
import { useCardProvider } from "./context/CardsProvider";
import CreateFilter from "./CreateFilter";

const Panel = () => {
  const { filter, setFilter, filterList, setFilterList } = useCardProvider();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isCreateFilter, setIsCreateFilter] = useState(false);

  const [delFilterError, setDelFilterError] = useState("");

  const [delLoader, setDelLoader] = useState(false);

  const filterOpenHandler = (e) => {
    const el = e.target.localName;
    const restrictedEl = ["i", "span", "button"];
    if (restrictedEl.includes(el)) return;
    setIsFilterOpen(!isFilterOpen);
  };

  const filterHandler = (e) => {
    // setChoosenFilter(e.target.id);
    setFilter(e.target.id);
    setIsFilterOpen(false);
  };

  const removeFilter = () => {
    // setChoosenFilter("");
    setFilter("");
    if (isFilterOpen) setIsFilterOpen(false);
  };

  const openCreateFilter = () => {
    setIsCreateFilter(true);
  };

  const deleteFilter = async () => {
    setDelLoader(true);
    try {
      let res = await fetchData({
        path: "/delete-filter",
        method: "delete",
        token: localStorage.getItem("token"),
        body: { filter: filter },
      });

      let data = res.json();

      if (!res.ok) {
        setDelFilterError(data.message);
        setIsFilterOpen(true);
        setDelLoader(false);
        return;
      }
      let updatedFilterList = filterList.filter((item) => item !== filter);
      setFilterList(updatedFilterList);
      setDelLoader(false);
      // setChoosenFilter("");
      setFilter("");
    } catch (err) {
      setDelFilterError("Something went wrong!");
      setIsFilterOpen(true);
      setDelLoader(false);
      console.log(err);
    }
  };

  return (
    <nav className="panel panel-custom">
      <p onClick={filterOpenHandler} className="panel-block panel-block-custom">
        <span className="has-text-info" id="panelHeadingName">
          <strong className="has-text-info">Filters</strong>
          <span className="icon">
            <i
              className={`fas fa-${
                isFilterOpen ? "chevron-up" : "chevron-down"
              }`}
            ></i>
          </span>
        </span>
        {filter && (
          <>
            <span className="tag is-link is-medium">
              {filter}
              <button
                onClick={removeFilter}
                className="delete is-medium"
              ></button>
            </span>
            <button
              onClick={deleteFilter}
              className={
                delLoader
                  ? "button is-danger is-small is-loading delete-filter-custom"
                  : "button is-danger is-small delete-filter-custom"
              }
            >
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
        {delFilterError && (
          <div className="panel-block">
            <p className="help is-danger delete-filter-custom">
              {delFilterError}
            </p>
          </div>
        )}
        <div className="panel-block">
          <button
            onClick={openCreateFilter}
            className="button is-warning"
            id="filterBtn"
            type="button"
          >
            <span className="icon" id="folderPlusIcon">
              <i className="fas fa-folder-plus"></i>
            </span>
            Create New Filter
          </button>
          {isCreateFilter && (
            <CreateFilter setIsCreateFilter={setIsCreateFilter} />
          )}
        </div>
        {filterList.map((item) => (
          <a
            key={item}
            id={item}
            onClick={filterHandler}
            className={
              filter === item ? "panel-block is-active" : "panel-block"
            }
          >
            <span className="panel-icon">
              <i className="fas fa-folder" aria-hidden="true"></i>
            </span>
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};
export default Panel;
