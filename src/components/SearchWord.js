import { useEffect, useRef, useState } from "react";
import { fetchData, regexValidator } from "../util/util";
import { useCardProvider } from "./context/CardsProvider";

const WORD_TYPES = [
  "noun",
  "pronoun",
  "verb",
  "adverb",
  "adjective",
  "determiner",
  "preposition",
  "conjunction",
];

const SearchWord = ({ modalHandler }) => {
  const { filter, words, setWords } = useCardProvider();

  const [choosenTypes, setChoosenTypes] = useState([]);

  const [choosenWordId, setChoosenWordId] = useState("");

  const [word, setWord] = useState("");

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [results, setResults] = useState([]);

  const [searchErrMsg, setSearchErrMsg] = useState("");

  const [isSaveFailed, setIsSaveFailed] = useState(false);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [saveErrMsg, setSaveErrMsg] = useState("");

  const [isPlay, setIsPlay] = useState("");

  const focusResults = useRef(null);

  useEffect(() => {
    return () => {
      clearSearching();
    };
  }, []);

  useEffect(() => {
    if (focusResults.current) {
      focusResults.current.focus();
    }
  }, [results]);

  useEffect(() => {
    if (choosenWordId) {
      setIsSaveFailed(false);
      setSaveErrMsg("");
    }
  }, [choosenWordId]);

  const clearSearching = () => {
    setWord("");
    setResults([]);
    setChoosenTypes([]);
    setChoosenWordId("");
  };

  const saveHandler = async () => {
    if (results.length === 0) return;
    if (!choosenWordId) return;
    if (isSaveFailed) return;
    setIsSaveLoading(true);

    try {
      let res = await fetchData({
        path: "/save-word",
        method: "post",
        token: localStorage.getItem("token"),
        body: {
          wordId: choosenWordId,
          filter: filter,
        },
      });

      let data = await res.json();

      if (!res.ok) {
        setIsSaveFailed(true);
        setIsSaveLoading(false);
        setSaveErrMsg(data.message);
        return;
      }

      setWords([data.word, ...words]);
      modalHandler();
    } catch (err) {
      console.log(err);
      setIsSaveFailed(true);
      setIsSaveLoading(false);
      setSaveErrMsg("Something went wrong!");
    }
  };

  const searchHandler = async () => {
    if (!word) return;
    setResults([]);
    setIsSearchLoading(true);
    setSearchErrMsg("");
    try {
      let res = await fetchData({
        path: "/search",
        method: "POST",
        token: localStorage.getItem("token"),
        body: {
          word: word,
          types: choosenTypes,
        },
      });

      let data = await res.json();

      if (!res.ok) {
        setIsSearchLoading(false);
        setSearchErrMsg(data.message);
        return;
      }

      setIsSearchLoading(false);
      setResults(data.results);
    } catch (err) {
      setIsSearchLoading(false);
      setSearchErrMsg("Something went wrong!");
      console.log(err);
    }
  };

  const wordHandler = (e) => {
    const val = e.target.value;
    const isValid = regexValidator(val, /[A-Za-z]/);
    if (!isValid) return;
    setWord(val);
  };

  const typeHandler = (e) => {
    const choosenType = e.target.id;
    if (choosenTypes.includes(choosenType)) {
      let updatedChoosenTypes = choosenTypes.filter(
        (type) => type !== choosenType
      );
      setChoosenTypes(updatedChoosenTypes);
      return;
    }
    let updatedChoosenTypes = [...choosenTypes, choosenType];
    setChoosenTypes(updatedChoosenTypes);
  };

  const chooseWordHandler = (e) => {
    const choosedWordId = e.target.value;
    setChoosenWordId(choosedWordId);
  };

  const playHandler = (e) => {
    setIsPlay(e.currentTarget.parentElement.id);
    const soundURL = e.currentTarget.id;
    let sound = new Audio(soundURL);
    sound.play();
    sound.onended = () => {
      setIsPlay("");
    };
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Search Word</p>
          <button
            onClick={modalHandler}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Oxford Dictionary"
                value={word}
                onChange={wordHandler}
              />
            </div>
            <div className="control">
              <a
                onClick={searchHandler}
                className={
                  isSearchLoading
                    ? "button is-info is-loading"
                    : "button is-info"
                }
              >
                Search
              </a>
            </div>
          </div>
          <div className="field is-grouped is-grouped-multiline">
            {WORD_TYPES.map((type) => (
              <p key={type} className="control">
                <a
                  onClick={typeHandler}
                  id={type}
                  className={
                    choosenTypes.includes(type) ? "button is-active" : "button"
                  }
                >
                  {type}
                </a>
              </p>
            ))}
          </div>
          {searchErrMsg && (
            <p className="help is-danger is-size-6">{searchErrMsg}</p>
          )}
          {results.length > 0 && (
            <div ref={focusResults} tabIndex={-1}>
              {results.map((result) => (
                <div
                  className={
                    choosenWordId === result.wordId
                      ? isSaveFailed
                        ? "search-result choosen-result-error"
                        : "search-result choosen-result"
                      : "search-result"
                  }
                  key={result.wordId}
                  id={result.wordId}
                >
                  <div className="control">
                    <input
                      type="radio"
                      name="choosenWord"
                      className="is-large"
                      checked={choosenWordId === result.wordId}
                      onChange={chooseWordHandler}
                      value={result.wordId}
                    />
                  </div>
                  <div
                    className="play-icon"
                    id={result.sound}
                    onClick={playHandler}
                  >
                    <span className="icon has-text-link">
                      <i
                        className={
                          isPlay === result.wordId
                            ? "fas fa-pause"
                            : "fas fa-play"
                        }
                      ></i>
                    </span>
                  </div>
                  <header className="content">
                    <p className="word is-size-4">
                      <strong>{result.word}</strong>
                      <span className="word-type is-italic is-size-7">
                        {result.wordType}
                      </span>
                    </p>
                  </header>
                  {result.definitions.map((definition, i) => (
                    <div key={i} className="content definition">
                      {definition}
                    </div>
                  ))}
                  {result.examples.map((example, i) => (
                    <div key={i} className="content example is-italic">
                      {example}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={saveHandler}
            className={
              isSaveFailed
                ? "button is-danger"
                : isSaveLoading
                ? "button is-success is-loading"
                : "button is-success"
            }
          >
            {isSaveFailed ? "Failed" : "Save"}
          </button>
          <button onClick={modalHandler} className="button">
            Cancel
          </button>
          {saveErrMsg && <p className="help is-danger">{saveErrMsg}</p>}
        </footer>
      </div>
    </div>
  );
};
export default SearchWord;
