import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import { Button } from "./Button";
import { faUserPen, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "./LoadingSpinner";

function ParentMainPagePanel() {
    const BaseUrl = 'https://api.mwis.pl/'
    const [id, setId] = useState();
    const [balance, setBalance] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const UserID = async () => {
         const response = await fetch("".concat(`${BaseUrl}`, ['auth/user']),  {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
         const content = await response.json();
         setId(content.pk);
       };

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

    const FamilyUsers = async () => {
        await fetch("".concat(`${BaseUrl}`, ['users/']),  {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }).then((response) => {
            return response.json();
        }).then(r => {
            setUsers(r);
        })
       };

    useEffect(() => {
        UserID().then(r => {});
        if(id) {
          Balance().then(r => {});
          FamilyUsers().then(r => {});
        }
     });

    return (
      <>
        <div className="main">
          <div className="leftSideContainer">
            <div className="money" >
              Twoje środki na koncie <br />
              {isLoading ? <LoadingSpinner spinnerSize="spin--medium"/> : `${balance}`  }
            </div>

            <Link to="/resetPasswordPanel" className="deposit">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="submit"
              >
                Wpłać pieniądze
              </Button>
            </Link>

            <Link to="/resetPasswordPanel" className="withdraw">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="submit"
              >
                Wypłać pieniądze
              </Button>
            </Link>

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
              {isLoading ? <LoadingSpinner spinnerSize="spin--medium"/> :
              users.filter(owner => owner.user_type !== 1).map((user) => (
                  <div key={user.id} className="row">
                    <p className="col">{user.first_name} {user.last_name}</p>
                    <p className="col">{user.balance}</p>
                    <Link to="/" className="col">
                    <FontAwesomeIcon icon={ faBook } className="allowance-icon" />
                    </Link>
                    <Link to="/" className="col">
                      <FontAwesomeIcon icon={ faBook } className="transfers-icon" />
                    </Link>
                    <Link to="/" className="col">
                      <FontAwesomeIcon icon={ faUserPen } className="manage-icon" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
}

export default ParentMainPagePanel;
