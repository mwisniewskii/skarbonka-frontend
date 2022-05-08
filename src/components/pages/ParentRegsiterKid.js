import React, {useEffect, useState} from "react";
import ParentRegisterKidPanel from "../ParentRegisterKidPanel";
import Navigation from "../Navigation";

function ParentRegisterKid() {
  const BaseUrl = 'https://api.mwis.pl/'
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    (async () => {
      let resStatus = 0;
      await fetch("".concat(`${BaseUrl}`, ['auth/user']), {
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
        <Navigation />
        <ParentRegisterKidPanel />
      </>
    );
  } else {
    return (
      <p></p>
    )
  }
}

export default ParentRegisterKid;