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

  const [errorPage, setErrorPage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getFilters = async () => {
    if (errorPage) setErrorPage(null);
    setIsLoading(true);
    try {
      const data = await getFilterList();
      setFilterList(data.filters);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrorPage(err);
    }
  };

  const createFilter = async (filterName = "") => {
    if (!filterName) return;
    if (error) setError(null);
    setIsLoading(true);

    try {
      const data = await postCreateFilter({
        filter: filterName,
      });

      setFilterList([...filterList, filterName]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const delFilter = async (filterName = "") => {
    if (!filterName) return;
    if (error) setError(null);
    setIsLoading(true);

    try {
      const data = await deleteFilter({
        filter: filterName,
      });

      let updatedFilterList = filterList.filter((item) => item !== filterName);
      setFilterList(updatedFilterList);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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
    isLoading,
    errorPage,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
