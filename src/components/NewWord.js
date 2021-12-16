import { useEffect, useRef, useState } from "react";
import { dummyData as test } from "./testData";

const WORD_TYPES = [
  "noun",
  "pronoun",
  "verb",
  "adverb",
  "adjective",
  "determiner",
  "preposition",
  "conjuction",
];

const NewWord = ({ modalHandler }) => {
  const [choosenTypes, setChoosenTypes] = useState([]);

  const [choosenWordId, setChoosenWordId] = useState("");

  const [dummyData, setDummyData] = useState([]);

  const focusElement = useRef(null);

  useEffect(() => {
    console.log(focusElement.current);
    setTimeout(() => {
      setDummyData(test);
    }, 5000);
    return () => {
      setDummyData([]);
      setChoosenTypes([]);
      setChoosenWordId("");
    };
  }, []);

  useEffect(() => {
    if (focusElement.current) {
      console.log("yes");
      focusElement.current.focus();
    }
  }, [dummyData]);

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
              />
            </div>
            <div className="control">
              <a className="button is-info">Search</a>
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
          {dummyData.length > 0 && (
            <div ref={focusElement} tabIndex={-1}>
              {dummyData.map((data) => (
                <div
                  className={
                    choosenWordId === data.wordId
                      ? "search-result choosen-result"
                      : "search-result"
                  }
                  key={data.wordId}
                >
                  <div className="control">
                    <input
                      type="radio"
                      name="choosenWord"
                      className="is-large"
                      checked={choosenWordId === data.wordId}
                      onChange={chooseWordHandler}
                      value={data.wordId}
                    />
                  </div>
                  <div className="play-icon">
                    <span className="icon has-text-link">
                      <i className="fas fa-play"></i>
                    </span>
                  </div>
                  <header className="content">
                    <p className="word is-size-4">
                      <strong>{data.word}</strong>
                      <span className="word-type is-italic is-size-7">
                        {data.type}
                      </span>
                    </p>
                  </header>
                  <div className="content definition">{data.definition}</div>
                  <div className="content example is-italic">
                    {data.example}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save</button>
          <button onClick={modalHandler} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
export default NewWord;
