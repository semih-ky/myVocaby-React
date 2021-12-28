import { createContext, useContext, useEffect, useState } from "react";
import { fetchData, fetchWords } from "../../util/util";

const CardContext = createContext(null);

export const CardsProvider = ({ children }) => {
  const [words, setWords] = useState(null);

  const [filter, setFilter] = useState("");

  const [filterList, setFilterList] = useState(null);

  const [errFetchWords, setErrFetchWords] = useState(null);

  const [errFilterList, setErrFilterList] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isWordsLoading, setIsWordsLoading] = useState(false);

  useEffect(() => {
    async function fetchingData() {
      try {
        let res = await fetchData({
          path: "/filters",
          method: "get",
          token: localStorage.getItem("token"),
        });
        let data = await res.json();

        if (!res.ok) {
          setErrFilterList("Something went wrong!");
          return;
        }
        setFilterList(data.filters);
      } catch (err) {
        setErrFilterList("Something went wrong!");
        console.log(err);
      }
    }
    fetchingData();
  }, []);

  useEffect(() => {
    setIsWordsLoading(true);
    async function fetchingData() {
      try {
        let res = await fetchWords(filter);

        let data = await res.json();

        if (!res.ok) {
          setErrFetchWords(data.message);
          return;
        }
        console.log("fetching corresponding words by filter");
        data.words.sort(
          (item1, item2) =>
            Date.parse(item2.history) - Date.parse(item1.history)
        );
        setWords(data.words);
        setIsWordsLoading(false);
      } catch (err) {
        setIsWordsLoading(false);
        setErrFetchWords("Something went wrong!");
        console.log(err);
      }
    }
    fetchingData();
  }, [filter]);

  useEffect(() => {
    if (filterList && words) {
      setIsLoading(false);
    }
  }, [filterList, words]);

  let value = {
    words,
    setWords,
    errFetchWords,
    filter,
    setFilter,
    filterList,
    setFilterList,
    errFilterList,
    isLoading,
    isWordsLoading,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardProvider = () => useContext(CardContext);
