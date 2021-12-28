import { fetchData } from "../util/util";
import { useCardProvider } from "./context/CardsProvider";

const DeleteWarning = ({ wordId, setDeleteWarning }) => {
  const { words, setWords, filter } = useCardProvider();

  const cancelHandler = () => {
    setDeleteWarning("");
  };

  const deleteHandler = () => {
    fetchData({
      path: "/delete-word",
      method: "delete",
      token: localStorage.getItem("token"),
      body: { wordId, filter },
    });

    let updatedWords = words.filter((word) => word._id !== wordId);

    setWords(updatedWords);
    setDeleteWarning("");
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-danger">Warning!</p>
          <button
            onClick={cancelHandler}
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
          <button onClick={cancelHandler} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
export default DeleteWarning;
