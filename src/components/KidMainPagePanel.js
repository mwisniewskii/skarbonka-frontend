import React, { useEffect, useState, useCallback } from "react";
import "./KidMainPagePanel.css";
import { Button } from "./Button";
import { BaseUrl, UserInfo } from "../services/ApiCalls";
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
  const [isLoading2, setIsLoading2] = useState(true);
  const [users, setUsers] = useState([]);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  // const [responseStatus, setResponseStatus] = useState(null);

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
    amount: Yup.number("Kwota musi by?? liczb??!")
      .positive("Kwota musi by?? wi??ksza od 0!")
      .required("Kwota jest wymagana!"),
  });

  return (
    <>
      <div className="main-k">
        <div className="leftSideContainer-k">
          <div className="money-k">
            Twoje ??rodki na koncie <br />
            {isLoading ? (
              <LoadingSpinner spinnerSize="spin--medium" />
            ) : (
              "".concat(`${balance}`, " z??")
            )}
          </div>

          <div className="deposit-k">
            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--small"
              onClick={handleOpenDeposit}
            >
              Wp??a?? pieni??dze
            </Button>
            <Dialog open={openDeposit} onClose={handleCloseDeposit}>
              <DialogTitle>Wp??a?? pieni??dze na konto</DialogTitle>
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
                            "Uda??o si?? wp??aci?? ",
                            `${values.amount}`,
                            " z??!"
                          )
                        );
                      } else if (res.status === 400) {
                        Balance();
                        return toast.error("Nie uda??o si?? wp??aci?? pieni??dzy!");
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
                        Wp??a??
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
              Wyp??a?? pieni??dze
            </Button>
            <Dialog open={openWithdraw} onClose={handleCloseWithdraw}>
              <DialogTitle>Wyp??a?? pieni??dze z konta</DialogTitle>
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
                            "Uda??o si?? wyp??aci?? ",
                            `${values.amount}`,
                            " z??!"
                          )
                        );
                      } else if (res.status === 400) {
                        return toast.error("Nie uda??o si?? wyp??aci?? pieni??dzy!");
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
                        Wyp??a??
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
            {isLoading2 ? (
              <LoadingSpinner spinnerSize="spin--medium" />
            ) : (
              users
                .filter((owner) => owner.user_type === 1)
                .map((user) => (
                  <div key={user.id} className="parentBox">
                    <p>
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="rightSideContainer-k">
          <p className="title-k">Ostatnie wydarzenia na koncie</p>
          <div className="events-k">
            <div className="row-k">
              {/* <p className="col">Jan Kowalski</p>
              <p className="col">240 z??</p>
              <p className="col">150 z??</p>
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
