import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import "./LoginPanel.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({

   email: Yup.string()
     .email(<p>Niepoprawny e-mail</p>)
     .required(<p>E-mail jest wymagany!</p>),

   password: Yup.string()
     .required(<p>Hasło jest wymagane!</p>)

 });

function LoginPanel () {
  return (
    <>
      <main>
        <div className="wrap">
          <div className="panel">
            <div className="selectionPanel">
              <Link to="/" className="login-link">
                <div>Logowanie</div>
              </Link>
              <Link to="/register" className="register-link">
                <div>Utwórz konto</div>
              </Link>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: '',
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
                  <ErrorMessage name="email" />

                  <Field
                    id="password"
                    name="password"
                    placeholder="Hasło"
                  />
                  <ErrorMessage name="password" />

                  <Link to="/resetPassword" className="resetPasword-link">
                    <p>Zapomniałeś hasła?</p>
                  </Link>

                  <Button
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    type='submit'
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