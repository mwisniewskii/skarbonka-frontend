import React, { useEffect, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { LoadingSpinner } from "./LoadingSpinner";
import { BaseUrl, UserInfo } from "../services/ApiCalls";

function Navigation() {
  const [id, setId] = useState();
  const [userType, setUserType] = useState();
  const [responseStatus, setResponseStatus] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async () => {
    await fetch("".concat(`${BaseUrl}`, ["auth/logout/"]), {
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

  const handleDirecting = async () => {
    await fetch("".concat(`${BaseUrl}`, ["users/"], `${id}`), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((resJSON) => {
        setUserType(resJSON.user_type);
      });
  };

  useEffect(() => {
    UserInfo().then((r) => {
      setIsLoading(false);
      setFirstName(r.first_name);
      setLastName(r.last_name);
      setId(r.pk);
    });
    if (id) {
      handleDirecting();
    }
  });

  return (
    <>
      <nav className="navi">
        <div className="navi-container">
          <Link
            to={userType === 1 ? "/ParentMainPage" : "/KidMainPage"}
            className={`
              main-page 
              ${
                window.location.pathname === "/ParentMainPage" ||
                window.location.pathname === "/KidMainPage"
                  ? "bottomBorder"
                  : ""
              }`}
          >
            Strona Główna
          </Link>

          <Link
            to={userType === 1 ? "/TransactionByParent" : "/TransactionByKid"}
            className={`
              transfers 
              ${
                window.location.pathname === "/TransactionByParent" ||
                window.location.pathname === "/TransactionByKid"
                  ? "bottomBorder"
                  : ""
              }`}
          >
            Przelewy
          </Link>

          <Link
            to="/LoansPage"
            className={`
              loans 
              ${
                window.location.pathname === "/LoansPage" ? "bottomBorder" : ""
              }`}
          >
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
