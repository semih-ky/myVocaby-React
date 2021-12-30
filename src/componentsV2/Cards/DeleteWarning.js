import { useWords } from "../../contextV2/WordsProvider";

const DeleteWarning = ({ wordId, warningOpenClose }) => {
  const { delWord } = useWords();

  const deleteHandler = () => {
    delWord(wordId);
    warningOpenClose();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-danger">Warning!</p>
          <button
            onClick={warningOpenClose}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <p>
            If you click delete button, the word will be deleted from{" "}
            <strong>all filters.</strong>
          </p>
        </section>
        <footer className="modal-card-foot">
          <button onClick={deleteHandler} className="button is-danger">
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
