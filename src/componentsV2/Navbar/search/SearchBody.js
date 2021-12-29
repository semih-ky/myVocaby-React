import { useSearch } from "../../../contextV2/SearchProvider";
import SearchField from "./SearchField";
import SearchWordTypes from "./SearchWordTypes";
import SearchResults from "./SearchResults";

const SearchBody = () => {
  const { error } = useSearch();

  return (
    <section className="modal-card-body">
      <SearchField />
      <SearchWordTypes />
      {error && <p className="help is-danger is-size-6">{error.message}</p>}
      <SearchResults />
    </section>
  );
};
export default SearchBody;
