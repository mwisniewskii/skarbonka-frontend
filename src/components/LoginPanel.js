import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import {Link, Navigate} from "react-router-dom";
import "./LoginPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { UserInfo, BaseUrl } from "../services/ApiCalls";
import * as Yup from "yup";

const NegativeMessage = () => (
  <p className="login400">Podano nieprawidłowy adres e-mail lub hasło.</p>
);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),

  password: Yup.string().required("Hasło jest wymagane!"),
});

function LoginPanel() {
  const [id, setId] = useState();
  const [userType, setUserType] = useState();
  const [responseStatus, setResponseStatus] = useState(null);

  const UserType = async () => {
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
        setUserType(resJSON.user_type);
      });
  };

  useEffect(() => {
    UserInfo().then((r) => {
      setId(r.pk);
    });
    if (id) {
      UserType().then((r) => {});
    }
  });

  const displayMessage = () => {
    if (responseStatus === 400) {
      return <NegativeMessage />;
    } else if (userType === 1) {
      return <Navigate to="/ParentMainPage" />;
    } else if (userType === 2) {
      return <Navigate to="/KidMainPage" />;
    }
  };

  return (
    <>
      <main>
        <div className="wrap">
          <div className="panel">
            <div className="selectionPanel">
              <Link to="/loginPanel" className="login-link">
                <div>Logowanie</div>
              </Link>
              <Link to="/registerPanel" className="register-link">
                <div>Utwórz konto</div>
              </Link>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                let resStatus = 0;
                await fetch("https://api.mwis.pl/auth/login/", {
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
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    type="email"
                  />
                  <p className="errors">
                    <ErrorMessage name="email" />
                  </p>

                  <Field
                    id="password"
                    name="password"
                    placeholder="Hasło"
                    type="password"
                  />
                  <p className="errors">
                    <ErrorMessage name="password" />
                  </p>

                  <Link to="/resetPasswordPanel" className="resetPasword-link">
                    <p>Zapomniałeś hasła?</p>
                  </Link>

                  <Button
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                    type="submit"
                  >
                    Zaloguj się
                  </Button>
                </Form>
              )}
            </Formik>
            {displayMessage()}
            <div className="return">
              <Link to="/">
                <button className="returnButton">
                  <FontAwesomeIcon icon={faAngleLeft} className="faAngleLeft" />
                  Wróc do strony głównej
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPanel;
