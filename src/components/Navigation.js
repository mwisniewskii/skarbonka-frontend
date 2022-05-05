import React, {useEffect, useState} from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const handleLogout = async () => {
    let resStatus = 0;
    await fetch("https://api.mwis.pl/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      resStatus = res.status;
      setResponseStatus(resStatus);
    });

    if (responseStatus === 200) {
      return window.location.reload();
    } else {
      return null;
    }
  };

  useEffect(() => {
    (async () => {
       const response = await fetch("https://api.mwis.pl/auth/user/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
       const content = await response.json();

      setFirstName(content.first_name);
      setLastName(content.last_name);
     })();
   });


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

          <p className="user-name">{`${firstName} ${lastName}`}</p>

          <Link to="/" onClick={handleLogout}>
            <div className="logout">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="logout-icon" />
              Wyloguj się
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navigation;