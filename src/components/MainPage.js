import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {AuthUser} from "../services/ApiCalls";

function MainPage() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then(r => setResponseStatus(r.status));
  });

  if (responseStatus === 400) {
    return (
      <>
        <div>Hello there.</div>
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
