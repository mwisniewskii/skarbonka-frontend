import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./ResetPasswordPanel.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Niepoprawny e-mail")
    .required("E-mail jest wymagany!"),
});

const ResetPasswordPanel = () => {
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
            <div>
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
};

export default ResetPasswordPanel;
