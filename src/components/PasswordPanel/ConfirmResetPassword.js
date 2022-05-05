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

function ConfirmResetPassword() {
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
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                let resStatus = 0;
                await fetch("https://api.mwis.plauth/password/reset/confirm/", {
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
                    id="password1"
                    name="password1"
                    placeholder="Nowe hasło"
                    type="password"
                  />
                  <p className="errors">
                    <ErrorMessage name="password1" />
                  </p>
                  <div className="info">
                    <b> Hasło musi zawierać:</b>
                  </div>
                  <ul>
                    <li>minimum 8 znaków</li>
                    <li>przynajmniej jedna wielka litera</li>
                    <li>przynajmniej jedna cyfra</li>
                  </ul>
                  <Field
                    id="password2"
                    name="password2"
                    placeholder="Powtórz nowe hasło"
                    type="password"
                  />
                  <p className="errors">
                    <ErrorMessage name="password2" />
                  </p>

                  <Button
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                    type="submit"
                  >
                    Ustaw nowe hasło
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
}

export default ConfirmResetPassword;
