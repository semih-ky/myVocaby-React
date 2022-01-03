import { useState, useEffect } from "react";
import { useWords } from "../../contextV2/WordsProvider";
import { deleteWord } from "../../utilsV2/fetch.api";

const DeleteWarning = ({ word, warningOpenClose }) => {
  const { words, setWords, filter } = useWords();

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    if (!word.wordId) return;
    if (error) setError(null);
    setIsLoading(true);
    try {
      const data = await deleteWord({
        wordId: word.wordId,
        filter: filter,
      });
      let updatedWords = words.filter((item) => item.wordId !== word.wordId);
      setWords(updatedWords);
      setIsLoading(false);
      warningOpenClose();
    } catch (err) {
      console.log(err);
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        style={{ touchAction: "none" }}
        // onTouchStart={(e) => {
        //   e.preventDefault();
        //   console.log(e);
        // }}
        // onTouchMove={(e) => {
        //   e.preventDefault();
        //   console.log(e);
        // }}
        // onWheel={(e) => e.preventDefault()}
      ></div>
      <div className="modal-card" style={{ touchAction: "none" }}>
        <header className="modal-card-head">
          <p className="modal-card-title has-text-danger">Warning!</p>
          <button
            onClick={warningOpenClose}
            className="delete"
            aria-label="close"
          ></button>
        </header>

        {error ? (
          <section style={{ touchAction: "none" }} className="modal-card-body">
            <p className="has-text-danger">{error.message}</p>
          </section>
        ) : (
          <section style={{ touchAction: "none" }} className="modal-card-body">
            <p>
              Are you sure want to delete word: <strong>{word.wordName}</strong>{" "}
              ?
            </p>
            {filter ? (
              <p>
                Filter: <strong>{filter}</strong>
              </p>
            ) : (
              <p>
                If you click delete button, the word will be deleted from{" "}
                <strong>all filters.</strong>
              </p>
            )}
          </section>
        )}

        <footer className="modal-card-foot">
          <button
            onClick={deleteHandler}
            className={
              isLoading ? "button is-danger is-loading" : "button is-danger"
            }
          >
            Delete
          </button>
          <button onClick={warningOpenClose} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
export default DeleteWarning;
