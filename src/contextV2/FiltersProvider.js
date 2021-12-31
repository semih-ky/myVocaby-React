import { createContext, useContext, useState, useEffect } from "react";
import {
  getFilterList,
  postCreateFilter,
  deleteFilter,
} from "../utilsV2/fetch.api";
import { useWords } from "./WordsProvider";

const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const { changeFilter } = useWords();

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
      setErrorPage(err);
      setIsLoading(false);
    }
  };

  const createFilter = async (filterName = "") => {
    if (!filterName) return false;
    if (error) setError(null);
    setIsLoading(true);

    try {
      const data = await postCreateFilter({
        filter: filterName,
      });

      setFilterList([...filterList, filterName]);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
      return false;
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
      changeFilter();
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetch filters");
    getFilters();
  }, []);

  const value = {
    filterList,
    error,
    setError,
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
