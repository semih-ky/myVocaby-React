import { useState } from "react";
import { useLocation } from "react-router-dom";
import Brand from "./Brand";
import QuizLink from "./QuizLink";
import SearchWord from "./search/SearchWord";
import Logout from "./Logout";

const Navbar = () => {
  const location = useLocation();
  console.log("navbar location", location); // for remove search in quiz page

  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const burgerMenu = () => {
    setIsBurgerActive(!isBurgerActive);
  };
  return (
    <>
      <div className="navbar-break"></div>
      <nav
        className="navbar is-link is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Brand />

          <a
            onClick={burgerMenu}
            role="button"
            className={
              isBurgerActive ? "navbar-burger is-active" : "navbar-burger"
            }
            aria-label="menu"
            aria-expanded="false"
            data-target="navMobile"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="navMobile"
          className={isBurgerActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className="navbar-start">
            <QuizLink />
          </div>

          <div className="navbar-end">
            {location.pathname !== "/quiz" && <SearchWord />}
            <Logout />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
