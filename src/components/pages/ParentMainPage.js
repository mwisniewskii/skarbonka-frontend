import React, {useEffect, useState} from "react";
import "../../App.css";
import Navigation from "../Navigation";
import ParentMainPagePanel from "../ParentMainPagePanel";
import { AuthUser } from "../../services/ApiCalls";


function ParentMainPage() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then(r => setResponseStatus(r.status));
  });

  if (responseStatus === 200) {
    return (
      <>
        <Navigation/>
        <ParentMainPagePanel/>
      </>
    );
  } else {
    return (
      <p></p>
    )
  }
}

export default ParentMainPage;