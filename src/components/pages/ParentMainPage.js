import React from "react";
import "../../App.css";
import ParentMainPagePanel from "../ParentMainPagePanel";
import Navigation from "../Navigation";


function ParentMainPage() {
  return (
    <>
      <Navigation />
      <ParentMainPagePanel />
    </>
  );
}

export default ParentMainPage;