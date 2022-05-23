import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";
import ConfirmResetPassword from "./components/PasswordPanel/ConfirmResetPassword";
import Footer from "./components/Footer";
import ParentRegisterKid from "./components/pages/ParentRegsiterKid";
import ParentMainPage from "./components/pages/ParentMainPage";
import KidMainPage from "./components/pages/KidMainPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/loginPanel" exact element={<Login />} />
          <Route path="/registerPanel" exact element={<Register />} />
          <Route path="/resetPasswordPanel" exact element={<ResetPassword />} />
          <Route
            path="/confirmResetPassword/:uid/:token/"
            exact
            element={<ConfirmResetPassword />}
          />
          <Route path="/ParentMainPage" exact element={<ParentMainPage />} />
          <Route path="/KidMainPage" exact element={<KidMainPage />} />
          <Route
            path="/ParentRegisterKid"
            exact
            element={<ParentRegisterKid />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
