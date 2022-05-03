import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function MainPage() {
  const [responseStatus, setResponseStatus] = useState(null);
  // const [name, setName] = useState("");

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
        .then((result) => {
          console.log(result);
        });
    })();
  });

  if (responseStatus === 400) {
    return (
      <>
        <div>Hello there.</div>
      </>
    );
  } else {
    return (
      <>
        <header>
          <p className="message">
            <b>
              <em>Twój rodzinny bank</em>
            </b>
          </p>
          <aside>
            <Link to="/loginPanel" className="dir">
              <FontAwesomeIcon icon={faCircleUser} className="faCircleUser" />
              <div className="authorization">
                <p>Zaloguj się</p>
                <p>Załóż konto</p>
              </div>
            </Link>
          </aside>
        </header>
        <div className="startPage">
          <p className="baner">Wirtualny bank dla Twojego dziecko</p>
        </div>
      </>
    );
  }

  // return (
  //   <>
  //     <header>
  //       <p className="message">
  //         <b>
  //           <em>Twój rodzinny bank</em>
  //         </b>
  //       </p>
  //       <aside>
  //         <Link to="/loginPanel" className="dir">
  //           <FontAwesomeIcon icon={faCircleUser} className="faCircleUser" />
  //           <div className="authorization">
  //             <p>Zaloguj się</p>
  //             <p>Załóż konto</p>
  //           </div>
  //         </Link>
  //       </aside>
  //     </header>
  //     <div className="startPage">
  //       <p className="baner">Wirtualny bank dla Twojego dziecko</p>
  //     </div>
  //   </>
  // );
}

export default MainPage;
