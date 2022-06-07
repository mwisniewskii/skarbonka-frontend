import React, { useEffect, useState } from "react";
import TransactionByKid from "../TransactionByKid";
import Navigation from "../Navigation";
import { AuthUser } from "../../services/ApiCalls";

function TransactionByParentPanel() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then((r) => setResponseStatus(r.status));
  });

  if (responseStatus === 200) {
    return (
      <>
        <Navigation />
        <TransactionByKid />
      </>
    );
  } else {
    return <p></p>;
  }
}

export default TransactionByParentPanel;
