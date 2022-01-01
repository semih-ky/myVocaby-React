import { createContext, useContext, useEffect, useState } from "react";
import { getWords } from "../utilsV2/fetch.api";

const WordsContext = createContext(null);

export const WordsProvider = ({ children }) => {
  console.log("words provider");
  const [words, setWords] = useState([]);

  const [filter, setFilter] = useState("");

  const [errorPage, setErrorPage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchWords = async () => {
    if (errorPage) setErrorPage(null);
    setIsLoading(true);
    try {
      const data = await getWords(filter);
      data.words.sort(
        (item1, item2) => Date.parse(item2.history) - Date.parse(item1.history)
      );
      setWords(data.words);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErrorPage(err);
      setIsLoading(false);
    }
  };

  const changeFilter = (filter = "") => {
    setFilter(filter);
  };

  useEffect(() => {
    console.log("fetch words");
    fetchWords();
  }, [filter]);

  let value = {
    words,
    setWords,
    filter,
    changeFilter,
    isLoading,
    errorPage,
  };

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
};

export const useWords = () => useContext(WordsContext);
