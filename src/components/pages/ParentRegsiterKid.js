import React, {useEffect, useState} from "react";
import ParentRegisterKidPanel from "../ParentRegisterKidPanel";
import Navigation from "../Navigation";
import { AuthUser } from "../../services/ApiCalls";

function ParentRegisterKid() {
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    AuthUser().then((r) => setResponseStatus(r.status));
  });

  if (responseStatus === 200) {
    return (
      <>
        <Navigation />
        <ParentRegisterKidPanel />
      </>
    );
  } else {
    return <p></p>;
  }
}

export default ParentRegisterKid;