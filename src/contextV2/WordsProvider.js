import { createContext, useContext, useEffect, useState } from "react";
import { getWords, postSaveWord, deleteWord } from "../utilsV2/fetch.api";

const WordsContext = createContext(null);

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState(null);

  const [filter, setFilter] = useState("");

  const [error, setError] = useState(null);

  const [errorPage, setErrorPage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchWords = async () => {
    if (errorPage) setErrorPage(null);
    setIsLoading(true);
    try {
      const data = await getWords(filter);
      data.words.sort(
        (item1, item2) => Date.parse(item2.history) - Date.parse(item1.history)
      );
      setIsLoading(false);
      setWords(data.words);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setErrorPage(err);
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
      setIsLoading(false);
      setWords([data.word, ...words]);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
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
      setIsLoading(false);
      setWords(updatedWords);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  const changeFilter = (filter = "") => {
    setFilter(filter);
  };

  const removeError = () => {
    setError(null);
  };

  useEffect(() => {
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
