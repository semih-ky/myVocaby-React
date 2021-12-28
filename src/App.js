import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./components/context/Auth";
import { CardsProvider } from "./components/context/CardsProvider";
import Authentication from "./components/Authentication";
import RestrictedPage from "./components/RestrictedPage";
import Login from "./pages/login";
import Signup from "./pages/signup/";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Error from "./pages/error";

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
              <CardsProvider>
                <Home />
              </CardsProvider>
            </Authentication>
          }
        />
        <Route
          path="/home"
          element={
            <Authentication>
              <CardsProvider>
                <Home />
              </CardsProvider>
            </Authentication>
          }
        />
        <Route
          path="/quiz"
          element={
            <Authentication>
              <CardsProvider>
                <Quiz />
              </CardsProvider>
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
