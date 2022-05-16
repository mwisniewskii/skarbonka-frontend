import React, {useEffect, useState} from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "./LoadingSpinner";
import { UserInfo } from "../services/ApiCalls";

function Navigation() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await fetch("https://api.mwis.pl/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      setResponseStatus(res.status);
    });

    if (responseStatus === 200) {
      return window.location.reload();
    } else {
      return null;
    }
  };

  useEffect(() => {
    UserInfo().then((r) => {
      setIsLoading(false);
      setFirstName(r.first_name);
      setLastName(r.last_name);
    });
  }, [firstName, lastName]);

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

          <Link to="/ParentMainPage" className="loans">
            Pożyczki
          </Link>

          <div className="user-name">
            <FontAwesomeIcon icon={faUser} className="logout-icon" />
            {isLoading ? (
              <LoadingSpinner spinnerSize="spin--small" />
            ) : (
              `${firstName} ${lastName}`
            )}
          </div>

          <Link to="/" onClick={handleLogout} className="logout">
            <div className="logout-container">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="logout-icon"
              />
              Wyloguj się
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navigation;