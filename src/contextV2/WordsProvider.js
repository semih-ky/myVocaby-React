import { createContext, useContext, useEffect, useState } from "react";
import { getWords, postSaveWord, deleteWord } from "../utilsV2/fetch.api";

const WordsContext = createContext(null);

export const WordsProvider = ({ children }) => {
  const [words, setWords] = useState(null);

  const [filter, setFilter] = useState("");

  const [error, setError] = useState(null);

  const fetchWords = async (filter = "") => {
    try {
      const data = await getWords(filter);
      data.words.sort(
        (item1, item2) => Date.parse(item2.history) - Date.parse(item1.history)
      );
      setWords(data.words);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const saveWord = async (wordId = "", filter = "") => {
    if (!wordId) return;
    try {
      const data = await postSaveWord({
        wordId: wordId,
        filter: filter,
      });
      setWords([data.word, ...words]);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const delWord = async (wordId = "", filter = "") => {
    if (!wordId) return;
    try {
      const data = await deleteWord({
        wordId: wordId,
        filter: filter,
      });
      let updatedWords = words.filter((word) => word._id !== wordId);
      setWords(updatedWords);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const changeFilter = (filter = "") => {
    setFilter(filter);
  };

  useEffect(() => {
    fetchWords(filter);
  }, [filter]);

  let value = {
    words,
    filter,
    changeFilter,
    error,
    saveWord,
    delWord,
  };

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
};

export const useWordsProvider = () => useContext(WordsContext);
