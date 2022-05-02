import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";
import Footer from "./components/Footer";
import ParentRegisterKid from "./components/pages/ParentRegsiterKid";
import ParentMainPage from "./components/pages/ParentMainPage";

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
          <Route path="/ParentMainPage" exact element={<ParentMainPage />} />
          <Route path="/ParentRegisterKid" exact element={<ParentRegisterKid />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
