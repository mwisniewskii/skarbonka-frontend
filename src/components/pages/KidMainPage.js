import React, {useEffect, useState} from "react";
import "../../App.css";
import KidMainPagePanel from "../KidMainPagePanel";
import Navigation from "../Navigation";
import { AuthUser } from "../../services/ApiCalls";

function KidMainPage() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then((r) => setResponseStatus(r.status));
  });

  if (responseStatus === 200) {
    return (
      <>
        <Navigation />
        <KidMainPagePanel />
      </>
    );
  } else {
    return <p></p>;
  }
}

export default KidMainPage;