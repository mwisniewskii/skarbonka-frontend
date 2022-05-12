import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./KidMainPagePanel.css";
import { Button } from "./Button";
import { faUserPen, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {BaseUrl, UserInfo} from "../services/ApiCalls";

function KidMainPagePanel() {
    const [id, setId] = useState();
    const [balance, setBalance] = useState();
    const [isLoading, setIsLoading] = useState(true);


    const Balance = async () => {
        await fetch("".concat(`${BaseUrl}`, ['users/'],`${id}`), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          }).then((response) => {
            return response.json();
          }).then((resJSON) => {
              setBalance(resJSON.balance);
              setIsLoading(false);
          })
        };

    useEffect(() => {
      UserInfo().then(r => {setId(r.pk);});
      Balance().then(r => {});
     });

    return (
      <>
        <div className="main">
          <div className="leftSideContainer">
            <p className="money">
              Twoje środki na koncie <br />
              {`${balance}`}
            </p>

            <Link to="/resetPasswordPanel" className="resetPasword-link">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="submit"
              >
                Wpłać pieniądze
              </Button>
            </Link>

            <Link to="/resetPasswordPanel" className="resetPasword-link">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="submit"
              >
                Wypłać pieniądze
              </Button>
            </Link>

            <div className="big-box">
              <p className="parent">RODZIC</p>
              <p className="name">Marian Kowalski</p>
            </div>
          </div>

          <div className="rightSideContainer">
            <p className="title">Ostatnie wydarzenia na koncie</p>
            <div className="all-kids">
              <div className="row">
                <p className="col">Jan Kowalski</p>
                <p className="col">240 zł</p>
                <p className="col">150 zł</p>
                <Link to="/" className="col">
                  <FontAwesomeIcon icon={ faBook } className="transfers-icon" />
                </Link>
                <Link to="/" className="col">
                  <FontAwesomeIcon icon={ faUserPen } className="manage-icon" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default KidMainPagePanel;
