import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useSearch } from "../../../contextV2/SearchProvider";

const WORD_TYPES = [
  "noun",
  "pronoun",
  "verb",
  "adverb",
  "adjective",
  "determiner",
  "preposition",
  "conjunction",
];

const SearchWordTypes = () => {
  const { isLoading, choosenTypes, setChoosenTypes } = useSearch();

  const [isOptOpen, setIsOptOpen] = useState(false);

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

  const optionHandler = () => {
    setIsOptOpen(!isOptOpen);
  };

  useEffect(() => {
    if (isLoading) {
      setIsOptOpen(false);
    }
  }, [isLoading]);

  return (
    <>
      <div
        onClick={optionHandler}
        style={{ marginBottom: "10px", cursor: "pointer" }}
      >
        <span className="icon-text">
          <span>Options</span>
          <span className="icon">
            <i
              className={
                isOptOpen ? "fas fa-chevron-up" : "fas fa-chevron-down"
              }
            ></i>
          </span>
        </span>
      </div>
      <div
        className="field is-grouped is-grouped-multiline"
        style={{ display: `${isOptOpen ? "flex" : "none"}` }}
      >
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
    </>
  );
};
export default SearchWordTypes;
