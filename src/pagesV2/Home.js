import { useWords } from "../contextV2/WordsProvider";
import Error from "./Error";
import { useFilters } from "../contextV2/FiltersProvider";
import Navbar from "../componentsV2/Navbar/Navbar";
import Panel from "../componentsV2/Panel/Panel";
import Cards from "../componentsV2/Cards/Cards";

const Home = () => {
  const { errorPage: getWordsError } = useWords();

  const { errorPage: getFiltersError } = useFilters();

  console.log("home");

  return (
    <>
      {getWordsError ? (
        <Error
          message={getWordsError.message}
          statusCode={getWordsError.statusCode}
        />
      ) : getFiltersError ? (
        <Error
          message={getFiltersError.message}
          statusCode={getFiltersError.statusCode}
        />
      ) : (
        <>
          <Navbar />
          <Panel />
          <Cards />
        </>
      )}
    </>
  );
};
export default Home;
