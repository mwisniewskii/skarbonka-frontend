import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import { Button } from "./Button";
import {faUserPen, faBook, faSackDollar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import { UserInfo, BaseUrl } from "../services/ApiCalls";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import {MenuItem, TextField} from "@material-ui/core";

function ParentMainPagePanel() {
  const [id, setId] = useState();
  const [balance, setBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [userAllowance, setUsersAllowance] = useState([]);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openAllowance, setOpenAllowance] = useState(false);
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
  const handleOpenAllowance = () => {
    setOpenAllowance(true);
  };
  const handleCloseAllowance = () => {
    setOpenAllowance(false);
  };


  const Balance = useCallback(async () => {
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
        setBalance(resJSON.balance);
        setIsLoading(false);
      });
  }, [id]);

  const FamilyUsers = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, ["users/"]), {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((resJSON) => {
        setUsers(resJSON);
        setIsLoading2(false);
      });
  }, []);

  const handleUserAllowance = useCallback(async (user) => {
    await fetch("".concat(`${BaseUrl}`, ["allowances/"]),{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((resJSON) => {
        setUsersAllowance(resJSON.filter((allowance) => user.id === allowance.child));
        console.log(userAllowance);
        setIsLoadingAllowance(false);
        setUser(user);
      });
  }, [userAllowance]);

  useEffect(() => {
    UserInfo().then((r) => {
      setId(r.pk);
    });
    FamilyUsers();

    if (id) {
      Balance();
    }
  }, [Balance, id, FamilyUsers]);

  const Money = Yup.object().shape({
    amount: Yup.number("Kwota musi być liczbą!")
      .positive("Kwota musi być większa od 0!")
      .required("Kwota jest wymagana!"),
  });

  const allowanceValidation = Yup.object().shape({
    amount: Yup.number("Kwota musi być liczbą!")
      .positive("Kwota musi być większa od 0!")
      .required("Kwota jest wymagana!"),
  });

  const formik = useFormik({
    initialValues: {
      child: userAllowance.child,
      amount: userAllowance.amount,
      frequency: userAllowance.frequency,
    },
    validationSchema: allowanceValidation,
    onSubmit: async (values) => {
      await fetch("".concat(`${BaseUrl}`, ["allowances/"]), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        setResponseStatus(res.status);
        if (responseStatus === 201) {
          return toast.success(
            "".concat(
              "Udało się ustalić kieszonkowe na ",
              `${values.amount}`,
              " zł.",
            )
          );
        } else if (responseStatus === 400) {
          return toast.error("Nie udało się ustalić kieszonkowego!");
        }
      });
    },
  });

  return (
    <>
      <div className="main-p">
        <div className="leftSideContainer-p">
          <div className="money-p">
            Twoje środki na koncie <br />
            {isLoading ? (
              <LoadingSpinner spinnerSize="spin--medium" />
            ) : (
              "".concat(`${balance}`, " zł")
            )}
          </div>

          <div className="deposit-p">
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              onClick={handleOpenDeposit}
            >
              Wpłać pieniądze
            </Button>
            <Dialog open={openDeposit} onClose={handleCloseDeposit}>
              <DialogTitle>Wpłać pieniądze na konto</DialogTitle>
              <DialogContent>
                <Formik
                  initialValues={{
                    amount: "",
                  }}
                  validationSchema={Money}
                  onSubmit={async (values) => {
                    await fetch("".concat(`${BaseUrl}`, ["deposit/"]), {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                      body: JSON.stringify(values, null, 2),
                    }).then((res) => {
                      if (res.status === 201) {
                        Balance();
                        return toast.success(
                          "".concat(
                            "Udało się wpłacić ",
                            `${values.amount}`,
                            " zł!"
                          )
                        );
                      } else if (res.status === 400) {
                        return toast.error("Nie udało się wpłacić pieniędzy!");
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
                <Toaster position="bottom-right" reverseOrder={false} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeposit}>Zamknij</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="withdraw-p">
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              onClick={handleOpenWithdraw}
            >
              Wypłać pieniądze
            </Button>
            <Dialog open={openWithdraw} onClose={handleCloseWithdraw}>
              <DialogTitle>Wypłać pieniądze z konta</DialogTitle>
              <DialogContent>
                <Formik
                  initialValues={{
                    amount: "",
                  }}
                  validationSchema={Money}
                  onSubmit={async (values) => {
                    await fetch("".concat(`${BaseUrl}`, ["withdraw/"]), {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                      body: JSON.stringify(values, null, 2),
                    }).then((res) => {
                      if (res.status === 201) {
                        Balance();
                        return toast.success(
                          "".concat(
                            "Udało się wypłacić ",
                            `${values.amount}`,
                            " zł!"
                          )
                        );
                      } else if (res.status === 400) {
                        return toast.error("Nie udało się wypłacić pieniędzy!");
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
                <Toaster position="bottom-right" reverseOrder={false} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseWithdraw}>Zamknij</Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="transaction-history-p">
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              type="button"
            >
              Historia transakcji
            </Button>
          </div>
        </div>
        <div className="rightSideContainer-p">
          <Link to="/ParentRegisterKid" className="create-kid">
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              type="button"
            >
              Utwórz konto dziecka
            </Button>
          </Link>
          <p className="title-p">Konta Twoich Dzieci</p>
          <p className="title-col-p">Imię i nazwisko</p>
          <p className="title-col-p">Saldo</p>
          <p className="title-col-p">Kieszonkowe</p>
          <p className="title-col-p">Transakcje</p>
          <p className="title-col-p">Zarządzaj</p>
          <div className="all-kids-p">
            {isLoading2 ? (
              <LoadingSpinner spinnerSize="spin--medium" />
            ) : (
              users
                .filter((owner) => owner.user_type !== 1)
                .map((kid) => (
                  <div key={kid.id} className="row-p">
                    <p className="col-p">
                      {kid.first_name} {kid.last_name}
                    </p>
                    <p className="col-p">{kid.balance} zł</p>
                      <FontAwesomeIcon
                        icon={faSackDollar}
                        className="col-p"
                        onClick={() => {
                          handleOpenAllowance();
                          handleUserAllowance(kid);
                        }}
                      />
                      <Dialog
                        open={openAllowance}
                        onClose={() => {
                          handleCloseAllowance();
                          setIsLoadingAllowance(true);
                        }}
                      >
                        {isLoadingAllowance ? (<LoadingSpinner spinnerSize="spin-medium"/>) :
                          (
                          <>
                            <DialogTitle>
                              Kieszonkowe
                            </DialogTitle>
                            <DialogTitle>
                              {user.first_name} {user.last_name}
                            </DialogTitle>
                            <DialogContent>
                              <form onSubmit={formik.handleSubmit} className="allowance-form">
                                <TextField
                                  fullWidth
                                  id="amount"
                                  name="amount"
                                  label="Kwota"
                                  value={formik.values.amount}
                                  onChange={formik.handleChange}
                                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                                  helperText={formik.touched.amount && formik.errors.amount}
                                />
                                <TextField
                                  id="outlined-select-currency"
                                  select
                                  label="Czestotliwość"
                                  value={formik.values.frequency}
                                  onChange={formik.handleChange}
                                  error={formik.touched.frequency && Boolean(formik.errors.frequency)}
                                  helperText={formik.touched.frequency && formik.errors.frequency}
                                >
                                  <MenuItem value={1}>
                                    Codziennie
                                  </MenuItem>
                                  <MenuItem value={2}>
                                    Co tydzien
                                  </MenuItem>
                                  <MenuItem value={3}>
                                    Co miesiąc
                                  </MenuItem>
                                </TextField>
                                <Button
                                  buttonStyle="btn--primary"
                                  buttonSize="btn--small"
                                  type="submit"
                                >
                                  Zapisz
                                </Button>
                              </form>
                            </DialogContent>
                          </>
                          )}
                      </Dialog>
                    <Link to="/" className="col-p">
                      <FontAwesomeIcon
                        icon={faBook}
                        className="transfers-icon"
                      />
                    </Link>
                    <Link to="/" className="col-p">
                      <FontAwesomeIcon
                        icon={faUserPen}
                        className="manage-icon"
                      />
                    </Link>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentMainPagePanel;
