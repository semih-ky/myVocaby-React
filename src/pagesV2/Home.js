import { useCardProvider } from "../../components/context/CardsProvider";
import Cards from "../../components/Cards";
import Navbar from "../../components/Navbar";
import Panel from "../../components/Panel";
import Loading from "../../components/Loading";
import Error from "../error";

const Home = () => {
  const { isLoading, errFetchWords, errFilterList } = useCardProvider();
  return (
    <>
      {isLoading ? (
        errFetchWords || errFilterList ? (
          <Error message={errFetchWords ? errFetchWords : errFilterList} />
        ) : (
          <Loading />
        )
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
