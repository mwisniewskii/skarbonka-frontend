import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faUser,
  faTentArrowTurnLeft,
} from "@fortawesome/free-solid-svg-icons";

function MainPage() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseStatus2, setResponseStatus2] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
      let resStatus = 0;
      const response = await fetch("https://api.mwis.pl/auth/user/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      resStatus = await response.status;
      setResponseStatus(resStatus);

      const content = await response.json();

      setFirstName(content.first_name);
      setLastName(content.last_name);
    })();
  });

  if (responseStatus === 200) {
    return (
      <>
        <section className="userNav">
          <p>Strona Główna</p>
          <p>Załóż konto dziecku</p>
          <div className="personalData">
            <FontAwesomeIcon icon={faUser} className="faUser" />
            <p>{`${firstName} ${lastName}`}</p>
          </div>
          <div>
            <Link to="/" onClick={handleLogout}>
              <FontAwesomeIcon icon={faTentArrowTurnLeft} className="faLeft" />
              <button className="logout">Wyloguj się</button>
            </Link>
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <header>
          <p className="message">
            <b>
              <em>Twój rodzinny bank</em>
            </b>
          </p>
          <aside>
            <Link to="/loginPanel" className="dir">
              <FontAwesomeIcon icon={faCircleUser} className="faCircleUser" />
              <div className="authorization">
                <p>Zaloguj się</p>
                <p>Załóż konto</p>
              </div>
            </Link>
          </aside>
        </header>
        <div className="startPage">
          <p className="baner">Wirtualny bank dla Twojego dziecko</p>
        </div>
      </>
    );
  }
}

export default MainPage;
