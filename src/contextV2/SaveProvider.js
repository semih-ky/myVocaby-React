import { createContext, useContext, useState, useEffect } from "react";
import { postSaveWord } from "../utilsV2/fetch.api";
import { useWords } from "./WordsProvider";

const SaveWordContext = createContext(null);

export const SaveWordProvider = ({ children }) => {
  const { words, setWords, filter } = useWords();

  const [choosenWordId, setChoosenWordId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const clearSaveWord = () => {
    setChoosenWordId("");
    setIsLoading(false);
    setError(null);
  };

  const saveWord = async () => {
    if (!choosenWordId) return;
    if (error) setError(null);
    setIsLoading(true);
    try {
      const data = await postSaveWord({
        wordId: choosenWordId,
        filter: filter,
      });
      setWords([data.word, ...words]);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [choosenWordId]);

  const value = {
    choosenWordId,
    setChoosenWordId,
    isLoading,
    error,
    saveWord,
    clearSaveWord,
  };

  return (
    <SaveWordContext.Provider value={value}>
      {children}
    </SaveWordContext.Provider>
  );
};

export const useSaveWord = () => useContext(SaveWordContext);
