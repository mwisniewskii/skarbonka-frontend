import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./RegisterPanel.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const PositiveMessage = () => (
  <section class="popUp">
    <div class="register201">
      <p>
        Twoje konto zostało utworzone. Kliknij <em>Zaloguj się</em>.
      </p>
      <Link to="/loginPanel">
        <button>Zaloguj się</button>
      </Link>
    </div>
  </section>
);

const NegativeMessage = () => (
  <p className="register400">
    Wygląda na to, że Twoje konto zostało już utworzone.
  </p>
);

const LoginSchemat = Yup.object().shape({
  first_name: Yup.string().required("Imię jest wymagane!"),

  last_name: Yup.string().required("Nazwisko jest wymagane!"),

  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),

  password1: Yup.string()
    .required("Hasło jest wymagane!")
    .min(8, "Hasło musi zawierać minimum 8 znaków.")
    .matches(/^.*(?=.*\d).*$/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /^.*((?=.*[A-Z]){1}).*$/,
      "Hasło musi zawierać przynajmniej jedną wielką literę."
    ),

  password2: Yup.string()
    .required("Pole jest wymagane!")
    .oneOf([Yup.ref("password1")], "Podane hasła nie są identyczne"),
});

function RegisterPanel() {
  const [responseStatus, setResponseStatus] = useState(null);

  const displayMessage = () => {
    if (responseStatus === 201) {
      return <PositiveMessage />;
    } else if (responseStatus === 400) {
      return <NegativeMessage />;
    }
  };

  return (
    <>
      <div className="mainStart">
        <div className="wrapp">
          <div className="panell">
            <div className="selectionPanel">
              <Link to="/loginPanel" className="login-link2">
                <div>Logowanie</div>
              </Link>
              <Link to="/registerPanel" className="register-link2">
                <div>Utwórz konto</div>
              </Link>
            </div>
            <Formik
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password1: "",
                password2: "",
              }}
              validationSchema={LoginSchemat}
              onSubmit={async (values) => {
                let resStatus = 0;
                await fetch("https://api.mwis.pl/auth/registration/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
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
                    id="first_name"
                    name="first_name"
                    placeholder="Imię"
                    type="text"
                  />
                  <p className="errors">
                    <ErrorMessage name="first_name" />
                  </p>

                  <Field
                    id="last_name"
                    name="last_name"
                    placeholder="Nazwisko"
                    type="text"
                  />
                  <p className="errors">
                    <ErrorMessage name="last_name" />
                  </p>

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
                    id="password1"
                    name="password1"
                    placeholder="Hasło"
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
                    placeholder="Powtórz hasło"
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
                    Utwórz konto
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
      </div>
    </>
  );
}

export default RegisterPanel;
