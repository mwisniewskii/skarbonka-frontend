import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ParentMainPagePanel.css";
import { Button } from "./Button";
import {faUserPen, faBook, faSackDollar, faXmark} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingSpinner } from "./LoadingSpinner";
import { Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import { UserInfo, BaseUrl, } from "../services/ApiCalls";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { MenuItem, TextField} from "@material-ui/core";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { doNothing } from "@mui/x-date-pickers/internals/utils/utils";

function ParentMainPagePanel() {
  const [id, setId] = useState();
  const [balance, setBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(true);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [userAllowance, setUsersAllowance] = useState([]);
  const [idAllowance, setIdAllowance] = useState([]);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openAllowance, setOpenAllowance] = useState(false);
  const [openEditAllowance, setOpenEditAllowance] = useState(false);
  const [openNewAllowance, setOpenNewAllowance] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [time, setTime] = useState(new Date());

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
  const handleOpenEditAllowance = () => {
    setOpenEditAllowance(true);
  };
  const handleCloseEditAllowance = () => {
    setOpenEditAllowance(false);
  };
  const handleOpenNewAllowance = () => {
    setOpenNewAllowance(true);
  };
  const handleCloseNewAllowance = () => {
    setOpenNewAllowance(false);
  };

  const Balance = useCallback(async () => {
    await fetch("".concat(`${BaseUrl}`, "users/", `${id}`), {
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
    await fetch("".concat(`${BaseUrl}`, "users/"), {
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
    await fetch("".concat(`${BaseUrl}`, "allowances/"),{
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
        let temp = resJSON.filter((allowance) => allowance.child === user.id)
        setUsersAllowance(temp);
        setIsLoadingAllowance(false);
        setUser(user);
      });
  }, []);

  const allowanceValidation = Yup.object().shape({
    amount: Yup.number("Kwota musi być liczbą!")
      .positive("Kwota musi być większa od 0!")
      .required("Kwota jest wymagana!"),
    day_of_week: Yup.number("Dzień musi być liczbą!")
      .min(0, 'Dzień musi być większy od 0!')
      .max(30, 'Dzień musi być mniejszy od 7'),
    day_of_month: Yup.number("Dzień musi być liczbą!")
      .min(0, 'Dzień musi być większy od 0!')
      .max(30, 'Dzień musi być mniejszy od 28')

  });

  const handleDeleteAllowance = useCallback(async(id) => {
    await fetch("".concat(`${BaseUrl}`, "allowances/", `${id}`, "/"), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 201) {
          handleUserAllowance(user);
          return toast.success("Udało się usunąć kieszonkowe");
        } else if (response.status === 400) {
          return toast.error("Nie udało się usunąć kieszonkowego!");
        }
      })
  }, [handleUserAllowance, user]);

  const formularz = useFormik({
    initialValues: {
      child: "",
      amount: "",
      frequency: "",
      execute_time: "",
      day_of_month: 1,
      day_of_week: 1,
    },
    validationSchema: allowanceValidation,
    onSubmit: async (values) => {
      values.execute_time = time.getHours() + ':' + time.getMinutes() + ':' + '00';
      values.child = user.id;
      await fetch("".concat(`${BaseUrl}`, "allowances/"), {
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

  const editForm = useFormik({
    initialValues: {
      child: "",
      amount: "",
      frequency: "",
      execute_time: "",
      day_of_month: 1,
      day_of_week: 1,
    },
    validationSchema: allowanceValidation,
    onSubmit: async (values) => {
      values.execute_time = time.getHours() + ':' + time.getMinutes() + ':' + '00';
      values.child = user.id;
      console.log(idAllowance)
      await fetch("".concat(`${BaseUrl}`, "allowances/", `${idAllowance}`, "/"), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        setResponseStatus(res.status);
        if (responseStatus === 201) {
          console.log("udalo sie")
          return toast.success("Udało się edytować kieszonkowe");
        } else if (responseStatus === 400) {
          return toast.error("Nie udało się edytować kieszonkowego!");
        }
      });
    },
  });

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

  const weekDay = () => {
    return <TextField
      fullWidth
      id="day_of_week"
      name="day_of_week"
      label="Dzień tygodnia"
      type="number"
      value={formularz.values.day_of_week}
      onChange={formularz.handleChange}
      error={formularz.touched.day_of_week && Boolean(formularz.errors.day_of_week)}
      helperText={formularz.touched.day_of_week && formularz.errors.day_of_week}
    />
  }

  const monthDay = () => {
    return <TextField
      fullWidth
      id="day_of_month"
      name="day_of_month"
      label="Dzień miesiąca"
      type="number"
      value={formularz.values.day_of_month}
      onChange={formularz.handleChange}
      error={formularz.touched.day_of_month && Boolean(formularz.errors.day_of_month)}
      helperText={formularz.touched.day_of_month && formularz.errors.day_of_month}
    />
  }

  const editWeekDay = () => {
    return <TextField
      fullWidth
      id="day_of_week"
      name="day_of_week"
      label="Dzień tygodnia"
      type="number"
      value={editForm.values.day_of_week}
      onChange={editForm.handleChange}
      error={editForm.touched.day_of_week && Boolean(editForm.errors.day_of_week)}
      helperText={editForm.touched.day_of_week && editForm.errors.day_of_week}
    />
  }

  const editMonthDay = () => {
    return <TextField
      fullWidth
      id="day_of_month"
      name="day_of_month"
      label="Dzień miesiąca"
      type="number"
      value={editForm.values.day_of_month}
      onChange={editForm.handleChange}
      error={editForm.touched.day_of_month && Boolean(editForm.errors.day_of_month)}
      helperText={editForm.touched.day_of_month && editForm.errors.day_of_month}
    />
  }

  const allowanceForm = () => {
    return <>
      <DialogTitle>
          Kieszonkowe
        </DialogTitle>
        <DialogTitle>
          {user.first_name} {user.last_name}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formularz.handleSubmit} className="allowance-form">
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Kwota"
              type="number"
              value={formularz.values.amount}
              onChange={formularz.handleChange}
              error={formularz.touched.amount && Boolean(formularz.errors.amount)}
              helperText={formularz.touched.amount && formularz.errors.amount}
            />
            <TextField
              id="outlined-select-currency"
              name="frequency"
              select
              label="Czestotliwość"
              value={formularz.values.frequency}
              onChange={formularz.handleChange}
              error={formularz.touched.frequency && Boolean(formularz.errors.frequency)}
              helperText={formularz.touched.frequency && formularz.errors.frequency}
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <TimePicker
                  label="Godzina wykonania"
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  ampm = {false}
                  closeOnSelect = {true}
                />
              </Stack>
              {formularz.values.frequency === 2 ?
                weekDay() :
               formularz.values.frequency === 3 ?
                monthDay() : doNothing()
              }
            </LocalizationProvider>
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              type="submit"
              onClick={handleCloseNewAllowance}
            >
              Zapisz
            </Button>
          </form>
        </DialogContent>
      </>
  }

  const editAllowanceForm = () => {
    return <>
      <DialogTitle>
          Kieszonkowe
        </DialogTitle>
        <DialogTitle>
          {user.first_name} {user.last_name}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={allowanceForm.handleSubmit} className="allowance-form">
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Kwota"
              type="number"
              value={editForm.values.amount}
              onChange={editForm.handleChange}
              error={editForm.touched.amount && Boolean(editForm.errors.amount)}
              helperText={editForm.touched.amount && editForm.errors.amount}
            />
            <TextField
              id="outlined-select-currency"
              name="frequency"
              select
              label="Czestotliwość"
              value={editForm.values.frequency}
              onChange={editForm.handleChange}
              error={editForm.touched.frequency && Boolean(editForm.errors.frequency)}
              helperText={editForm.touched.frequency && editForm.errors.frequency}
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <TimePicker
                  label="Godzina wykonania"
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  ampm = {false}
                  closeOnSelect = {true}
                />
              </Stack>
              {editForm.values.frequency === 2 ?
                editWeekDay() :
               editForm.values.frequency === 3 ?
                editMonthDay() : doNothing()
              }
            </LocalizationProvider>
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              type="submit"
              onClick={handleCloseNewAllowance}
            >
              Zapisz
            </Button>
          </form>
        </DialogContent>
      </>
  }

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
            <Dialog open={openDeposit} onClose={handleCloseDeposit}>,
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
                        fullWidth= 'true'
                        maxWidth= 'lg'
                        scroll = 'body'
                        open={openAllowance}
                        onClose={() => {
                          handleCloseAllowance();
                          setIsLoadingAllowance(true);
                        }}
                      >
                        <DialogContent>
                          <p className="title-allowance">Kieszonkowe</p>
                          <p className="title-kid">{user.first_name} {user.last_name}</p>
                          <p className="title-col-allowance">Kwota</p>
                          <p className="title-col-allowance">Godzina</p>
                          <p className="title-col-allowance">Dzien Tygodnia / Miesiaca</p>
                          <p className="title-col-allowance">Edytuj</p>
                          <p className="title-col-allowance">Usuń</p>
                          {isLoadingAllowance ? (<LoadingSpinner spinnerSize="spin-medium"/>) :
                            (
                              userAllowance
                                .map((allowance) => (
                                  <div key={allowance.id} className="row-allowance">
                                    <p className="col-allowance">
                                      {allowance.amount} zł
                                    </p>
                                    <p className="col-allowance">
                                      {allowance.execute_time.split(":")[0]}:{allowance.execute_time.split(":")[1]}
                                    </p>
                                    <p className="col-allowance">
                                      {allowance.day_of_month === allowance.day_of_week ?
                                          allowance.day_of_week :
                                        allowance.day_of_month > allowance.day_of_week ?
                                          allowance.day_of_month : allowance.day_of_week
                                      }
                                    </p>
                                    <div className="col-allowance">
                                      <FontAwesomeIcon
                                        icon={faSackDollar}
                                        className="sackdollar-icon"
                                        onClick={() => {
                                          handleOpenEditAllowance();
                                        }}
                                      />
                                    </div>
                                    <Dialog
                                      open={openEditAllowance}
                                      onClose={() => {
                                        handleCloseEditAllowance();
                                        setIdAllowance(allowance.id)
                                      }}
                                    >
                                      {editAllowanceForm()}
                                    </Dialog>
                                    <div className="col-allowance">
                                      <FontAwesomeIcon
                                        icon={faXmark}
                                        className="xmark-icon"
                                        onClick= { () => {
                                          handleDeleteAllowance(allowance.id);
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))
                            )}
                            <Button
                              onClick={handleOpenNewAllowance}
                            >
                              Utwórz kieszonkowe
                            </Button>
                          </DialogContent>
                        <Dialog
                          open={openNewAllowance}
                          onClose={handleCloseNewAllowance}
                        >
                          {allowanceForm()}
                        </Dialog>
                      </Dialog>
                    <FontAwesomeIcon
                      icon={faBook}
                      className="col-p"
                    />
                    <FontAwesomeIcon
                      icon={faUserPen}
                      className="col-p"
                    />
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