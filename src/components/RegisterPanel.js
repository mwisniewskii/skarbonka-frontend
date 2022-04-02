import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./RegisterPanel.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchemat = Yup.object().shape({
  name: Yup.string().required("Imię jest wymagane!"),

  surname: Yup.string().required("Nazwisko jest wymagane!"),

  email: Yup.string()
    .email("Niepoprawny e-mail!")
    .required("E-mail jest wymagany!"),

  password: Yup.string()
    .required("Hasło jest wymagane!")
    .min(8, "Hasło musi zawierać minimum 8 znaków.")
    .matches(/^.*(?=.*\d).*$/, "Hasło musi zawierać przynajmniej jedną cyfrę.")
    .matches(
      /^.*((?=.*[A-Z]){1}).*$/,
      "Hasło musi zawierać przynajmniej jedną wielką literę."
    ),

  password2: Yup.string()
    .required("Pole jest wymagane!")
    .oneOf([Yup.ref("password")], "Podane hasła nie są identyczne"),
});

function RegisterPanel() {
  return (
    <>
      <div className="mainStart">
        <div className="wrapp">
          <div className="panell">
            <div className="selectionPanel">
              <Link to="/" className="login-link2">
                <div>Logowanie</div>
              </Link>
              <Link to="/registerPanel" className="register-link2">
                <div>Utwórz konto</div>
              </Link>
            </div>
            <Formik
              initialValues={{
                name: "",
                surname: "",
                email: "",
                password: "",
                password2: "",
              }}
              validationSchema={LoginSchemat}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field id="name" name="name" placeholder="Imię" type="text" />
                  <p className="errors">
                    <ErrorMessage name="name" />
                  </p>

                  <Field
                    id="surname"
                    name="surname"
                    placeholder="Nazwisko"
                    type="text"
                  />
                  <p className="errors">
                    <ErrorMessage name="surname" />
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
                    id="password"
                    name="password"
                    placeholder="Hasło"
                    type="password"
                  />
                  <p className="errors">
                    <ErrorMessage name="password" />
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
