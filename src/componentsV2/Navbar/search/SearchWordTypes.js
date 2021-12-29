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
  const { choosenTypes, setChoosenTypes } = useSearch();

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

  return (
    <div className="field is-grouped is-grouped-multiline">
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
  );
};
export default SearchWordTypes;
