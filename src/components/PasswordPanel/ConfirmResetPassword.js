import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./ResetPasswordPanel.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PositiveMessage = () => (
  <section class="popUp">
    <div class="register201">
      <p className="resetP200">Twoje hasło zostało pomyślnie zmienione.</p>
      <p>
        Kliknij <em>Zaloguj się</em>.
      </p>
      <Link to="/loginPanel">
        <button>Zaloguj się</button>
      </Link>
    </div>
  </section>
);

const NegativeMessage = () => (
  <p className="resetPassword400">Wygląda na to, że coś poszło nie tak.</p>
);

const LoginSchema = Yup.object().shape({
  new_password1: Yup.string()
    .required("Hasło jest wymagane!")
    .min(8, "Hasło musi zawierać minimum 8 znaków.")
    .matches(/^.*(?=.*\d).*$/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /^.*((?=.*[A-Z]){1}).*$/,
      "Hasło musi zawierać przynajmniej jedną wielką literę."
    ),

  new_password2: Yup.string()
    .required("Pole jest wymagane!")
    .oneOf([Yup.ref("new_password1")], "Podane hasła nie są identyczne"),
});

function ConfirmResetPassword() {
  const [responseStatus, setResponseStatus] = useState(null);
  const { uid, token } = useParams();

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
                new_password1: "",
                new_password2: "",
                uid,
                token,
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                let resStatus = 0;
                await fetch(
                  "https://api.mwis.pl/auth/password/reset/confirm/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values, null, 2),
                  }
                ).then((res) => {
                  resStatus = res.status;
                  setResponseStatus(resStatus);
                });
              }}
            >
              {({ errors, handleSubmit, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    id="new_password1"
                    name="new_password1"
                    placeholder="Nowe hasło"
                    type="password"
                  />
                  <p className="errors">
                    <ErrorMessage name="new_password1" />
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
                    id="new_password2"
                    name="new_password2"
                    placeholder="Powtórz nowe hasło"
                    type="password"
                  />
                  <p className="errors">
                    <ErrorMessage name="new_password2" />
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
