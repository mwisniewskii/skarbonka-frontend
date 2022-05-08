import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import { Button } from "./Button";
import { faUserPen, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "./LoadingSpinner";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function ParentMainPagePanel() {
    const BaseUrl = 'https://api.mwis.pl/'
    const [id, setId] = useState();
    const [balance, setBalance] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);


    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


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

    const Money = Yup.object().shape({
      amount: Yup
        .number("Kwota musi być liczbą!")
        .positive("Kwota musi być większa od 0!")
        .required("Kwota jest wymagana!")
    });

    const PositiveMessage = () => (
        <section className="popUp">
          <div className="register201">
            <p>
              Wpłaciłes pieniadze na konto.
            </p>
          </div>
        </section>
      );

    const NegativeMessage = () => (
      <p className="register400">
        Wystąpił błąd przy próbie wpłaty.
      </p>
    );


    const displayMessage = () => {
      if (responseStatus === 201) {
        return <PositiveMessage />;
      } else if (responseStatus === 400) {
        return <NegativeMessage />;
      }
    };


    return (
      <>
        <div className="main">
          <div className="leftSideContainer">
            <div className="money" >
              Twoje środki na koncie <br />
              {isLoading ? <LoadingSpinner spinnerSize="spin--medium"/> : `${balance}`  }
            </div>

            <div className="deposit">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="submit"
                onClick={handleOpen}
              >
                Wpłać pieniądze
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                >
                <DialogTitle>Wpłać pieniądze na konto</DialogTitle>
                <DialogContent>
                  <Formik
                    initialValues={{
                      amount: "",
                    }}
                    validationSchema={Money}
                    onSubmit={async (values) => {
                      let resStatus = 0;
                      await fetch("".concat(`${BaseUrl}`, ['deposit/']), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(values, null, 2),
                      }).then((res) => {
                        resStatus = res.status;
                        setResponseStatus(resStatus);
                      });
                    }}
                  >
                    {({ errors, handleSubmit, touched }) => (
                    <Form onSubmit={handleSubmit}>
                      <Field
                        id="amount"
                        name="amount"
                        placeholder="Kwota"
                        type="text"
                      />
                      <p className="errors">
                        <ErrorMessage name="amount" />
                      </p>

                      <Button
                        buttonStyle="btn--primary"
                        buttonSize="btn--large"
                        type="submit"
                      >
                        Wpłać
                      </Button>
                    </Form>
                    )}
                  </Formik>
                  {displayMessage()}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Zamknij</Button>
                </DialogActions>
              </Dialog>
            </div>

            <div className="withdraw">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                type="submit"
                onClick={handleOpen}
              >
                Wypłać pieniądze
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                >
                <DialogTitle>Wypłać pieniądze z konta</DialogTitle>
                <DialogContent>
                  <Formik
                    initialValues={{
                      amount: "",
                    }}
                    validationSchema={Money}
                    onSubmit={async (values) => {
                      let resStatus = 0;
                      await fetch("".concat(`${BaseUrl}`, ['withdraw/']), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(values, null, 2),
                      }).then((res) => {
                        resStatus = res.status;
                        setResponseStatus(resStatus);
                      });
                    }}
                  >
                    {({ errors, handleSubmit, touched }) => (
                    <Form onSubmit={handleSubmit}>
                      <Field
                        id="amount"
                        name="amount"
                        placeholder="Kwota"
                        type="text"
                      />
                      <p className="errors">
                        <ErrorMessage name="amount" />
                      </p>

                      <Button
                        buttonStyle="btn--primary"
                        buttonSize="btn--large"
                        type="submit"
                      >
                        Wypłać
                      </Button>
                    </Form>
                    )}
                  </Formik>
                  {displayMessage()}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Zamknij</Button>
                </DialogActions>
              </Dialog>
            </div>

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
