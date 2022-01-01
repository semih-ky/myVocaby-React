import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contextV2/AuthProvider";
import { WordsProvider } from "./contextV2/WordsProvider";
import { FiltersProvider } from "./contextV2/FiltersProvider";

import Authentication from "./componentsV2/Authentication";
import RestrictedPage from "./componentsV2/RestrictedPage";
import Login from "./pagesV2/Login";
import Signup from "./pagesV2/Signup";
import Home from "./pagesV2/Home";
import Quiz from "./pagesV2/Quiz/Quiz";
import Error from "./pagesV2/Error";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <WordsProvider>
                <FiltersProvider>
                  <Home />
                </FiltersProvider>
              </WordsProvider>
            </Authentication>
          }
        />
        <Route
          path="/home"
          element={
            <Authentication>
              <WordsProvider>
                <FiltersProvider>
                  <Home />
                </FiltersProvider>
              </WordsProvider>
            </Authentication>
          }
        />
        <Route
          path="/quiz"
          element={
            <Authentication>
              <WordsProvider>
                <Quiz />
              </WordsProvider>
            </Authentication>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedPage>
              <Login />
            </RestrictedPage>
          }
        />
        <Route
          path="/signup"
          element={
            <RestrictedPage>
              <Signup />
            </RestrictedPage>
          }
        />
        <Route
          path="*"
          element={<Error statusCode={404} message={"Page not found!"} />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
