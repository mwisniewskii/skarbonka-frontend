import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import {Button} from "./Button";

function ParentMainPagePanel() {
  const [responseStatus, setResponseStatus] = useState(null);
  // const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      let resStatus = 0;
      await fetch("http://api.mwis.pl/auth/user/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          resStatus = res.status;
          setResponseStatus(resStatus);
        })
        .then((result) => {
          console.log(result);
        });
    })();
  });

  if (responseStatus === 200) {
    return (
      <>
        <div>Hello there.</div>
      </>
    );
  } else {
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
                type="submit"
              >
                Historia transakcji
              </Button>
            </Link>

          </div>
        </div>
      </>
    );
  }
}

export default ParentMainPagePanel;
