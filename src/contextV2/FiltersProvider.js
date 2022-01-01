import { createContext, useContext, useState, useEffect } from "react";
import { getFilterList } from "../utilsV2/fetch.api";

const FiltersContext = createContext(null);

export const FiltersProvider = ({ children }) => {
  const [filterList, setFilterList] = useState([]);

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

  useEffect(() => {
    console.log("fetch filters");
    getFilters();
  }, []);

  const value = {
    filterList,
    setFilterList,
    errorPage,
    isLoading,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
