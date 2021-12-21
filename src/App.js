import { Route, Routes } from "react-router-dom";

import { AuthProvider } from "./components/context/Auth";
import Authentication from "./components/Authentication";
import RestrictedPage from "./components/RestrictedPage";
import Login from "./pages/login";
import Signup from "./pages/signup/";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import NotFound from "./pages/notFound";

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
              <Home />
            </Authentication>
          }
        />
        <Route
          path="/home"
          element={
            <Authentication>
              <Home />
            </Authentication>
          }
        />
        <Route
          path="/quiz"
          element={
            <Authentication>
              <Quiz />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
