import { useState } from "react";
import { useFilters } from "../../contextV2/FiltersProvider";
import Error from "../../pagesV2/Error";
import PanelHeader from "./PanelHeader";
import CreateFilter from "./CreateFilter/index";
import FilterList from "./FilterList";

const Panel = () => {
  const { errorPage } = useFilters();

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const panelOpenClose = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <>
      {errorPage ? (
        <Error message={errorPage.message} statusCode={errorPage.statusCode} />
      ) : (
        <nav className="panel panel-custom">
          <PanelHeader
            isPanelOpen={isPanelOpen}
            panelOpenClose={panelOpenClose}
          />
          {isPanelOpen && (
            <>
              <CreateFilter />
              <FilterList />
            </>
          )}
        </nav>
      )}
    </>
  );
};
export default Panel;
