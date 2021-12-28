import { useState } from "react/cjs/react.development";
import { fetchData } from "../util/util";
import { useCardProvider } from "./context/CardsProvider";
import DeleteWarning from "./DeleteWarning";
import Loading from "./Loading";

const Cards = () => {
  const { words, setWords, isWordsLoading, filter } = useCardProvider();

  const [isPlay, setIsPlay] = useState("");

  const [deleteWarning, setDeleteWarning] = useState("");

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
    const wordId = e.currentTarget.id;
    if (filter) {
      fetchData({
        path: "/delete-word",
        method: "delete",
        token: localStorage.getItem("token"),
        body: { wordId, filter },
      });

      let updatedWords = words.filter((word) => word._id !== wordId);

      setWords(updatedWords);
      return;
    }
    setDeleteWarning(wordId);
  };

  return (
    <>
      {isWordsLoading ? (
        <Loading />
      ) : (
        <div className="card-background">
          {deleteWarning && (
            <DeleteWarning
              wordId={deleteWarning}
              setDeleteWarning={setDeleteWarning}
            />
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
