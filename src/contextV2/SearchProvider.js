import { createContext, useContext, useState } from "react";
import fetchData from "../utilsV2/fetch.util";
import { useWords } from "./WordsProvider";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const { saveWord, removeError } = useWords();

  const [word, setWord] = useState("");

  const [choosenTypes, setChoosenTypes] = useState([]);

  const [choosenWordId, setChoosenWordId] = useState("");

  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  // const clearSearching = () => {
  //   setWord("");
  //   setResults([]);
  //   setChoosenTypes([]);
  //   setChoosenWordId("");
  // };

  const searchHandler = async () => {
    if (!word) return;
    if (error) setError(null);
    setResults([]);
    setChoosenWordId("");
    setIsLoading(true);

    try {
      const data = fetchData("/search", "POST", true, {
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

  const saveHandler = () => {
    saveWord(choosenWordId);
  };

  useEffect(() => {
    if (choosenWordId) {
      removeError();
    }
  }, [choosenWordId]);

  const value = {
    word,
    setWord,
    choosenTypes,
    setChoosenTypes,
    choosenWordId,
    setChoosenWordId,
    results,
    isLoading,
    error,
    searchHandler,
    saveHandler,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
