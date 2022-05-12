import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import { Button } from "./Button";
import { faUserPen, faBook} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "./LoadingSpinner";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {UserInfo, FamilyUsers, BaseUrl} from "../services/ApiCalls"
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from "yup";

function ParentMainPagePanel() {
    const [id, setId] = useState();
    const [balance, setBalance] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [responseStatus, setResponseStatus] = useState(null);

    const handleOpenDeposit = () => {
      setOpenDeposit(true);
    };
    const handleCloseDeposit = () => {
      setOpenDeposit(false);
    };
    const handleOpenWithdraw = () => {
      setOpenWithdraw(true);
    };
    const handleCloseWithdraw = () => {
      setOpenWithdraw(false);
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

    useEffect(() => {
        UserInfo().then(r => {setId(r.pk);});
        if(id) {
          Balance().then(r => {});
          FamilyUsers().then(r => {setUsers(r);});
        }
     });

    const Money = Yup.object().shape({
      amount: Yup
        .number("Kwota musi być liczbą!")
        .positive("Kwota musi być większa od 0!")
        .required("Kwota jest wymagana!")
    });

    return (
      <>
        <div className="main">
          <div className="leftSideContainer">
            <div className="money" >
              Twoje środki na koncie <br />
              {isLoading ? <LoadingSpinner spinnerSize="spin--medium"/> : "".concat(`${balance}`, " zł")  }
            </div>

            <div className="deposit">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                onClick={handleOpenDeposit}
              >
                Wpłać pieniądze
              </Button>
              <Dialog
                open={openDeposit}
                onClose={handleCloseDeposit}
                >
                <DialogTitle>Wpłać pieniądze na konto</DialogTitle>
                <DialogContent>
                  <Formik
                    initialValues={{
                      amount: "",
                    }}
                    validationSchema={Money}
                    onSubmit={async (values) => {
                      await fetch("".concat(`${BaseUrl}`, ['deposit/']), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(values, null, 2),
                      }).then((res) => {
                        setResponseStatus(res.status);
                        if (responseStatus === 201) {
                          return toast.success("".concat('Udało się wpłacić ', `${values.amount}`,' zł!'))
                        } else if (responseStatus === 400) {
                          return toast.error('Nie udało się wpłacić pieniędzy!')
                        }
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
                  <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeposit}>Zamknij</Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="withdraw">
              <Button
                buttonStyle="btn--primary"
                buttonSize="btn--small"
                onClick={handleOpenWithdraw}
              >
                Wypłać pieniądze
              </Button>
              <Dialog
                open={openWithdraw}
                onClose={handleCloseWithdraw}
                >
                <DialogTitle>Wypłać pieniądze z konta</DialogTitle>
                <DialogContent>
                  <Formik
                    initialValues={{
                      amount: "",
                    }}
                    validationSchema={Money}
                    onSubmit={async (values) => {
                      await fetch("".concat(`${BaseUrl}`, ['withdraw/']), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(values, null, 2),
                      }).then((res) => {
                        setResponseStatus(res.status);
                        if (responseStatus === 201) {
                          return toast.success("".concat('Udało się wypłacić ',`${values.amount}`, ' zł!'))
                        } else if (responseStatus === 400) {
                          return toast.error('Nie udało się wypłacić pieniędzy!')
                        }
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
                  <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseWithdraw}>Zamknij</Button>
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
