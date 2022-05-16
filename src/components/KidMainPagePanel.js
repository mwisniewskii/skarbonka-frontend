import React, {useEffect, useState} from "react";
import "./KidMainPagePanel.css";
import { Button } from "./Button";
import {BaseUrl, UserInfo} from "../services/ApiCalls";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

function KidMainPagePanel() {
  const [id, setId] = useState();
  const [balance, setBalance] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
  };

  useEffect(() => {
    UserInfo().then((r) => {
      setId(r.pk);
    });
    Balance().then((r) => {});
  });

  const Money = Yup.object().shape({
    amount: Yup.number("Kwota musi być liczbą!")
      .positive("Kwota musi być większa od 0!")
      .required("Kwota jest wymagana!"),
  });

  return (
    <>
      <div className="main-k">
        <div className="leftSideContainer-k">
          <p className="money-k">
            Twoje środki na koncie <br />
            {isLoading ? (
              <LoadingSpinner spinnerSize="spin--medium" />
            ) : (
              "".concat(`${balance}`, " zł")
            )}
          </p>

          <div className="deposit-k">
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
                      setResponseStatus(res.status);
                      if (responseStatus === 201) {
                        return toast.success(
                          "".concat(
                            "Udało się wpłacić ",
                            `${values.amount}`,
                            " zł!"
                          )
                        );
                      } else if (responseStatus === 400) {
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
          <div className="withdraw-k">
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
                      setResponseStatus(res.status);
                      if (responseStatus === 201) {
                        return toast.success(
                          "".concat(
                            "Udało się wypłacić ",
                            `${values.amount}`,
                            " zł!"
                          )
                        );
                      } else if (responseStatus === 400) {
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

          <div className="big-box">
            <p className="parent">RODZIC</p>
            <p className="name">Marian Kowalski</p>
          </div>
        </div>

        <div className="rightSideContainer-k">
          <p className="title-k">Ostatnie wydarzenia na koncie</p>
          <div className="events-k">
            <div className="row-k">
              {/* <p className="col">Jan Kowalski</p>
              <p className="col">240 zł</p>
              <p className="col">150 zł</p>
              <Link to="/" className="col">
                <FontAwesomeIcon icon={faBook} className="transfers-icon" />
              </Link>
              <Link to="/" className="col">
                <FontAwesomeIcon icon={faUserPen} className="manage-icon" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KidMainPagePanel;
