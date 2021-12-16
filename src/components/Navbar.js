import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NewWord from "./NewWord";

const Navbar = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const location = useLocation();

  const burgerMenu = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  const modalHandler = () => {
    setIsModalActive(!isModalActive);
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
          <Link
            to="/home"
            className="navbar-item is-size-4 is-family-monospace has-text-warning"
          >
            MyVocaby
          </Link>

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
            <Link
              to="/quiz"
              className={
                location.pathname === "/quiz"
                  ? "navbar-item is-active"
                  : "navbar-item"
              }
            >
              Quiz
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={modalHandler} className="button is-success">
                  <span className="icon">
                    <i className="fas fa-plus"></i>
                  </span>
                  <strong>New Word</strong>
                </button>
                {isModalActive && <NewWord modalHandler={modalHandler} />}
              </div>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-danger">
                  <strong>Logout</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
