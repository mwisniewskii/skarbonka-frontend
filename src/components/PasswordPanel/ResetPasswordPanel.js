import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./ResetPasswordPanel.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PositiveMessage = () => (
  <section class="popUp">
    {/* <div class="register201">
      <p>
        Twoje konto zostało utworzone. Kliknij <em>Zaloguj się</em>.
      </p>
      <Link to="/loginPanel">
        <button>Zaloguj się</button>
      </Link>
    </div> */}
  </section>
);

const NegativeMessage = () => (
  <p className="resetPassword400">Wygląda na to, że e-mail błędny.</p>
);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail")
    .required("E-mail jest wymagany!"),
});

const ResetPasswordPanel = () => {
  const [responseStatus, setResponseStatus] = useState(null);

  const displayMessage = () => {
    if (responseStatus === 200) {
      return <PositiveMessage />;
    } else if (responseStatus === 400) {
      return <NegativeMessage />;
    }
  };

  return (
    <>
      <main>
        <div className="wrap">
          <div className="reset">
            <h1>Resetowanie hasła</h1>
            <p>Podaj adres e-mail powiązany z Twoim kontem.</p>
            <p>Tam prześlemy link do zmiany hasła.</p>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                let resStatus = 0;
                await fetch("https://api.mwis.pl/auth/password/reset/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  // credentials: "include",
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

                  <Button
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                    type="submit"
                  >
                    Resetuj hasło
                  </Button>
                </Form>
              )}
            </Formik>
            {displayMessage()}
            <div>
              <Link to="/loginPanel">
                <button className="returnButton">
                  <FontAwesomeIcon icon={faAngleLeft} className="faAngleLeft" />
                  Wróc do logowania
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPasswordPanel;
