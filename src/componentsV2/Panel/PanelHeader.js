import { useWords } from "../../contextV2/WordsProvider";
import DeleteFilter from "./DeleteFilter";

const PanelHeader = ({ isPanelOpen, panelOpenClose }) => {
  const { filter, changeFilter } = useWords();

  const openCloseHandler = (e) => {
    const el = e.target.localName;
    const restrictedEl = ["i", "span", "button"];
    if (restrictedEl.includes(el)) return;
    panelOpenClose();
  };

  const dropFilter = () => {
    changeFilter();
  };

  return (
    <p onClick={openCloseHandler} className="panel-block panel-block-custom">
      <span className="has-text-info" id="panelHeadingName">
        <strong className="has-text-info">Filters</strong>
        <span className="icon">
          <i
            className={`fas fa-${isPanelOpen ? "chevron-up" : "chevron-down"}`}
          ></i>
        </span>
      </span>
      {filter && (
        <>
          <span className="tag is-link is-medium">
            {filter}
            <button onClick={dropFilter} className="delete is-medium"></button>
          </span>
          <DeleteFilter />
        </>
      )}
    </p>
  );
};
export default PanelHeader;
