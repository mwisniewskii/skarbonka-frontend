import React from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import { Button } from "./Button";
import { faUserPen, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ParentMainPagePanel() {
    return (
      <>
        <div className="main">
          <div className="leftSideContainer">
            <p className="money">Twoje środki na koncie <br />
               3350,00 zł
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

            <div className="blank"></div>

            <Link to="/resetPasswordPanel" className="transaction-history">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--medium"
                type="button"
              >
                Historia transakcji
              </Button>
            </Link>
          </div>
          <div className="rightSideContainer">
            <Link to="/ParentRegisterKid" className="create-kid">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="button"
              >
                Utwórz konto dziecka
              </Button>
            </Link>
            <p className="title">Konta Twoich Dzieci</p>
            <p className="title-col">Imie i nazwisko</p>
            <p className="title-col">Saldo</p>
            <p className="title-col">Kieszonkowe</p>
            <p className="title-col">Transakcje</p>
            <p className="title-col">Zarzadzaj</p>
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

export default ParentMainPagePanel;
