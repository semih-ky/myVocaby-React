import { createContext, useContext, useEffect, useState } from "react";
import { getWords, postSaveWord, deleteWord } from "../utilsV2/fetch.api";

const WordsContext = createContext(null);

export const WordsProvider = ({ children }) => {
  console.log("words provider");
  const [words, setWords] = useState([]);

  const [filter, setFilter] = useState("");

  const [error, setError] = useState(null);

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

  const saveWord = async (wordId = "") => {
    if (!wordId) return;
    if (error) setError(null);
    setIsLoading(true);
    try {
      const data = await postSaveWord({
        wordId: wordId,
        filter: filter,
      });
      setWords([data.word, ...words]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const delWord = async (wordId = "") => {
    if (!wordId) return;
    if (error) setError(null);
    setIsLoading(true);
    try {
      const data = await deleteWord({
        wordId: wordId,
        filter: filter,
      });
      let updatedWords = words.filter((word) => word._id !== wordId);
      setWords(updatedWords);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  const changeFilter = (filter = "") => {
    setFilter(filter);
  };

  const removeError = () => {
    setError(null);
  };

  useEffect(() => {
    console.log("fetch words");
    fetchWords();
  }, [filter]);

  let value = {
    words,
    filter,
    changeFilter,
    error,
    saveWord,
    delWord,
    isLoading,
    removeError,
    errorPage,
  };

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
};

export const useWords = () => useContext(WordsContext);
