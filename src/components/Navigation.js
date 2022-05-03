import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  return (
    <>
      <nav className="navi">
        <div className="navi-container">
          <Link to="/ParentMainPage" className="main-page">
            Strona Główna
          </Link>

          <Link to="/ParentMainPage" className="transfers">
            Przelewy
          </Link>

          <Link to="/ParentMainPage" className="credits">
            Kredyty
          </Link>

          <Link to="/ParentMainPage" className="loans">
            Pożyczki
          </Link>

          <p className="user-name">Imie Nazwisko</p>

          <div className="logout">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="logout-icon" />
            Wyloguj się
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;