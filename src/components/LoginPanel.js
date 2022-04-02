import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import "./LoginPanel.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
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
});

function LoginPanel() {
  return (
    <>
      <main>
        <div className="wrap">
          <div className="panel">
            <div className="selectionPanel">
              <Link to="/" className="login-link">
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
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ errors, touched }) => (
                <Form>
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
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPanel;