import { useState } from "react";
import { fetchData, regexValidator } from "../util/util";
import { useCardProvider } from "./context/CardsProvider";

const CreateFilter = ({ setIsCreateFilter }) => {
  const { filterList, setFilterList } = useCardProvider();

  const closeCreateFilter = () => {
    setIsCreateFilter(false);
  };

  const [filterName, setFilterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const filterNameHandler = (e) => {
    const val = e.target.value;
    const isValid = regexValidator(val, /[a-zA-Z0-9]/);
    if (!isValid) return;
    if (val.length > 20) return;
    setFilterName(val);
  };

  const createFilter = async () => {
    setIsLoading(true);

    try {
      let res = await fetchData({
        path: "/create-filter",
        method: "POST",
        token: localStorage.getItem("token"),
        body: { filter: filterName },
      });

      let data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setErrMsg(data.message);
        return;
      }

      setFilterList([...filterList, filterName]);

      setIsLoading(false);

      closeCreateFilter();
    } catch (err) {
      setIsLoading(false);
      setErrMsg("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Filter</p>
          <button
            onClick={closeCreateFilter}
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
          {errMsg && <p className="help is-danger">{errMsg}</p>}
        </section>
        <footer className="modal-card-foot">
          <button
            onClick={createFilter}
            className={
              isLoading ? "button is-warning is-loading" : "button is-warning"
            }
          >
            Create
          </button>
          <button onClick={closeCreateFilter} className="button">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};
export default CreateFilter;
