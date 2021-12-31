import { useWords } from "../contextV2/WordsProvider";
import Error from "./Error";
import Navbar from "../componentsV2/Navbar/index";
import Panel from "../componentsV2/Panel/index";
import Cards from "../componentsV2/Cards/index";

const Home = () => {
  const { errorPage } = useWords();

  console.log("home");

  return (
    <>
      {errorPage ? (
        <Error message={errorPage.message} statusCode={errorPage.statusCode} />
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
