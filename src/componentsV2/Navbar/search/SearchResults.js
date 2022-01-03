import { useState } from "react";
import { useSaveWord } from "../../../contextV2/SaveProvider";
import { useSearch } from "../../../contextV2/SearchProvider";

const SearchResults = () => {
  const { results } = useSearch();
  const { choosenWordId, setChoosenWordId, error } = useSaveWord();

  const [isPlay, setIsPlay] = useState("");

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
    <>
      {results.map((result) => (
        <div
          className={
            choosenWordId === result.wordId
              ? error
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
          <div className="play-icon" id={result.sound} onClick={playHandler}>
            <span className="icon has-text-link">
              <i
                className={
                  isPlay === result.wordId ? "fas fa-pause" : "fas fa-play"
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
    </>
  );
};
export default SearchResults;
