import React, { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { AuthUser } from "../../services/ApiCalls";
import { flexbox } from "@mui/system";

function ParentRegisterKid() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then((r) => setResponseStatus(r.status));
  });

  if (responseStatus === 200) {
    return (
      <>
        <Navigation />
        <main>
          <p
            style={{
              height: "100%",
              fontSize: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Funkcjonalność w budowie.
          </p>
        </main>
      </>
    );
  } else {
    return <p></p>;
  }
}

export default ParentRegisterKid;
