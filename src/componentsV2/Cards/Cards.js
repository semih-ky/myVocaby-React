import { useState } from "react";
import { useWords } from "../../contextV2/WordsProvider";
import Loading from "../Loading";
import DeleteWarning from "./DeleteWarning";

const Cards = () => {
  const { words, isLoading } = useWords();

  const [isPlay, setIsPlay] = useState("");

  const [isOpenWarning, setIsOpenWarning] = useState("");

  const [word, setWord] = useState("");

  const playHandler = (e) => {
    setIsPlay(e.currentTarget.parentElement.id);
    const soundURL = e.currentTarget.id;
    let sound = new Audio(soundURL);
    sound.play();
    sound.onended = () => {
      setIsPlay("");
    };
  };

  const deleteHandler = (e) => {
    const choosenWordId = e.currentTarget.id;
    const wordName = e.currentTarget.dataset.wordname;
    setWord({ wordId: choosenWordId, wordName });
    setIsOpenWarning(true);
  };

  const warningOpenClose = () => {
    setIsOpenWarning(!isOpenWarning);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="card-background">
          {isOpenWarning && (
            <DeleteWarning word={word} warningOpenClose={warningOpenClose} />
          )}
          <div className="cards-container">
            {words.map((word) => (
              <div className="box-container" key={word.wordId}>
                <div className="box" id={word.wordId}>
                  <div
                    id={word.sound}
                    onClick={playHandler}
                    className="play-icon"
                  >
                    <span className="icon has-text-link">
                      <i
                        className={
                          isPlay === word.wordId
                            ? "fas fa-pause"
                            : "fas fa-play"
                        }
                      ></i>
                    </span>
                  </div>
                  <div
                    className="delete-icon"
                    id={word._id}
                    data-wordname={word.word}
                    onClick={deleteHandler}
                  >
                    <span className="icon has-text-danger">
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </div>
                  <header className="content">
                    <p className="word is-size-4">
                      <strong>{word.word}</strong>
                      <span className="word-type is-italic is-size-7">
                        {word.wordType}
                      </span>
                    </p>
                  </header>
                  {word.definitions.map((definition, i) => (
                    <div key={i} className="content definition">
                      {definition}
                    </div>
                  ))}
                  {word.examples.map((example, i) => (
                    <div key={i} className="content example is-italic">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Cards;
