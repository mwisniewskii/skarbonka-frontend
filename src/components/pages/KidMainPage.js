import React, {useEffect, useState} from "react";
import "../../App.css";
import KidMainPagePanel from "../KidMainPagePanel";
import Navigation from "../Navigation";


function ParentMainPage() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    (async () => {
      let resStatus = 0;
      await fetch("https://api.mwis.pl/auth/user/", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          resStatus = res.status;
          setResponseStatus(resStatus);
        })
    })();
  });

  if (responseStatus === 200) {
    return (
      <>
        <Navigation/>
        <KidMainPagePanel/>
      </>
    );
  } else {
    return (
      <p></p>
    )
  }
}

export default ParentMainPage;