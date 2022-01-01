import { useState } from "react";
import CreateFilterModal from "./CreateFilterModal";

const CreateFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpenClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="panel-block">
      <button
        onClick={modalOpenClose}
        className="button is-warning"
        id="filterBtn"
        type="button"
      >
        <span className="icon" id="folderPlusIcon">
          <i className="fas fa-folder-plus"></i>
        </span>
        Create New Filter
      </button>
      {isModalOpen && <CreateFilterModal modalOpenClose={modalOpenClose} />}
    </div>
  );
};
export default CreateFilter;
