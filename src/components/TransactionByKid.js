import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./Button";
import "./Transactions.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LoadingSpinner } from "./LoadingSpinner";
import { BaseUrl } from "../services/ApiCalls";
import * as Yup from "yup";

function refreshPage() {
  window.location.reload(false);
}

const PositiveMessage = () => (
  <section className="popUp-transaction">
    <div className="transaction201">
      <p>Dokonanie przelewu przebiegło pomyślnie.</p>
      <button onClick={refreshPage}>Kolejny przelew</button>
      <Link to="/KidMainPage">
        <button className="returnButton">
          <FontAwesomeIcon icon={faAngleLeft} className="faAngleLeft" />
          Wróc do strony głównej
        </button>
      </Link>
    </div>
  </section>
);

const NegativeMessage = () => (
  <p className="register400">
    Wygląda na to, że coś poszło nie tak. Spróbuj ponownie.
  </p>
);

function TransactionByKid() {
  const [responseStatus, setResponseStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [firstId, setFirstId] = useState();

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
        let fatherMother = [];
        resJSON
          .filter((owner) => owner.user_type === 1)
          .map((parent) => (
            <li key={parent.id}>{fatherMother.push(`${parent.id}`)}</li>
          ));
        setFirstId(fatherMother[0]);
      });
  }, []);

  useEffect(() => {
    FamilyUsers();
  }, [FamilyUsers]);

  const displayMessage = () => {
    if (responseStatus === 201) {
      return <PositiveMessage />;
    } else if (responseStatus === 400) {
      return <NegativeMessage />;
    }
  };

  const Transaction = Yup.object().shape({
    title: Yup.string().required("Tytuł jest wymagany!"),

    description: Yup.string(),

    amount: Yup.number("Kwota musi być liczbą")
      .positive("Kwota musi być większa od 0!")
      .required("Kwota jest wymagana!"),
  });

  return (
    <>
      <div className="mainStart">
        <div className="wrapp">
          <div className="panell">
            <p className="main-text">Przelew do rodzica</p>
            {firstId === undefined ? (
              <LoadingSpinner spinnerSize="spin--medium" />
            ) : (
              <Formik
                initialValues={{
                  recipient: `${firstId}`,
                  title: "",
                  description: "",
                  amount: "",
                }}
                validationSchema={Transaction}
                onSubmit={async (values) => {
                  await fetch("https://api.mwis.pl/transaction/", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(values, null, 2),
                  }).then((res) => {
                    setResponseStatus(res.status);
                  });
                }}
              >
                {({ errors, handleSubmit, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    {users
                      .filter((owner) => owner.user_type === 1)
                      .map((parent) => (
                        <p value={parent.id} key={parent.id}>
                          <p className="parentLabel">Rodzic </p>
                          <p className="optionParent">
                            {parent.first_name} {parent.last_name}
                          </p>
                        </p>
                      ))}

                    <Field
                      id="title"
                      name="title"
                      placeholder="Tytuł przelewu"
                      type="text"
                    />
                    <p className="errors">
                      <ErrorMessage name="title" />
                    </p>

                    <Field
                      id="description"
                      name="description"
                      placeholder="Opis przelewu"
                      type="text"
                    />
                    <p className="errors">
                      <ErrorMessage name="description" />
                    </p>

                    <Field
                      id="amount"
                      name="amount"
                      placeholder="Kwota przelewu"
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
                      Dokonaj przelewu
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
            {displayMessage()}
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionByKid;
