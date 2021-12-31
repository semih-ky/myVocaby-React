import { useEffect, useState } from "react";
import { useFilters } from "../../../contextV2/FiltersProvider";
import { useWords } from "../../../contextV2/WordsProvider";
import { regexValidator } from "../../../utilsV2/util";

const CreateFilterModal = ({ modalOpenClose }) => {
  const { createFilter, error, setError, isLoading } = useFilters();

  const { changeFilter } = useWords();

  const [filterName, setFilterName] = useState("");

  const filterNameHandler = (e) => {
    const val = e.target.value;
    const isValid = regexValidator(val, /[a-zA-Z0-9]/);
    if (!isValid) return;
    if (val.length > 20) return;
    setFilterName(val);
  };

  const createHandler = async () => {
    const isCreated = await createFilter(filterName);
    if (isCreated) {
      modalOpenClose();
      changeFilter(filterName);
    }
  };

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Filter</p>
          <button
            onClick={modalOpenClose}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Filter name:</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    onChange={filterNameHandler}
                    value={filterName}
                    className="input"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          {error && <p className="help is-danger">{error.message}</p>}
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={createHandler}
            className={
              isLoading ? "button is-warning is-loading" : "button is-warning"
            }
          >
            Create
          </button>
          <button onClick={modalOpenClose} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
export default CreateFilterModal;
