import { createContext, useContext, useState } from "react";
import { postSearch } from "../utilsV2/fetch.api";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [word, setWord] = useState("");

  const [choosenTypes, setChoosenTypes] = useState([]);

  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const clearSearch = () => {
    setWord("");
    setChoosenTypes([]);
    setResults([]);
    setIsLoading(false);
    setError(null);
  };

  const searchWord = async () => {
    // if (!word) return;
    // if (error) setError(null);
    // setResults([]);
    // setChoosenWordId("");
    setIsLoading(true);

    try {
      const data = await postSearch({
        word: word,
        types: choosenTypes,
      });
      setIsLoading(false);
      setResults(data.results);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const value = {
    word,
    setWord,
    choosenTypes,
    setChoosenTypes,
    results,
    setResults,
    isLoading,
    error,
    setError,
    searchWord,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
