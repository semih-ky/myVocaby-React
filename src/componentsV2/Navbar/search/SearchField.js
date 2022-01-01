import { useSaveWord } from "../../../contextV2/SaveProvider";
import { useSearch } from "../../../contextV2/SearchProvider";
import { regexValidator } from "../../../utilsV2/util";

const SearchField = () => {
  const { word, setWord, searchWord, setResults, isLoading, error, setError } =
    useSearch();

  const { setChoosenWordId } = useSaveWord();

  const wordHandler = (e) => {
    const val = e.target.value;
    const isValid = regexValidator(val, /[A-Za-z]/);
    if (!isValid) return;
    setWord(val);
  };

  const searchHandler = () => {
    setChoosenWordId("");
    if (!word) return;
    if (error) setError(null);
    setResults([]);
    setChoosenWordId("");
    searchWord();
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Oxford Dictionary"
          value={word}
          onChange={wordHandler}
        />
      </div>
      <div className="control">
        <a
          onClick={searchHandler}
          className={isLoading ? "button is-info is-loading" : "button is-info"}
        >
          Search
        </a>
      </div>
    </div>
  );
};
export default SearchField;
