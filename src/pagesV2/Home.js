import { useWords } from "../contextV2/WordsProvider";
import { FiltersProvider } from "../contextV2/FiltersProvider";
import Loading from "../componentsV2/Loading";
import Error from "./Error";
import Navbar from "../componentsV2/Navbar/index";
import Panel from "../componentsV2/Panel/index";
// import Cards from "../../components/Cards";

const Home = () => {
  const { errorPage, isLoading } = useWords();
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : errorPage ? (
        <Error message={errorPage.message} statusCode={errorPage.statusCode} />
      ) : (
        <>
          <Navbar />

          <FiltersProvider>
            <Panel />
          </FiltersProvider>

          <Cards />
        </>
      )}
    </>
  );
};
export default Home;
