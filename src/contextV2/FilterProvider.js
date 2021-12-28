import { createContext, useContext, useState, useEffect } from "react";
import {
  getFilterList,
  postCreateFilter,
  deleteFilter,
} from "../utilsV2/fetch.api";

const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const [filterList, setFilterList] = useState([]);

  const [error, setError] = useState(null);

  const getFilters = async () => {
    try {
      const data = await getFilterList();
      setFilterList(data.filters);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const createFilter = async (filterName = "") => {
    if (!filterName) return;

    try {
      const data = await postCreateFilter({
        filter: filterName,
      });

      setFilterList([...filterList, filterName]);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const delFilter = async (filterName = "") => {
    if (!filterName) return;
    try {
      const data = await deleteFilter({
        filter: filterName,
      });

      let updatedFilterList = filterList.filter((item) => item !== filterName);
      setFilterList(updatedFilterList);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    getFilters();
  }, []);

  const value = {
    filterList,
    error,
    createFilter,
    delFilter,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFiltersProvider = () => useContext(FiltersContext);
