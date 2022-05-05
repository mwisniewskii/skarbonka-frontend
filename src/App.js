import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";
import ConfirmResetPassword from "./components/PasswordPanel/ConfirmResetPassword";
import Footer from "./components/Footer";

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
            path="/confirmResetPassword"
            exact
            element={<ConfirmResetPassword />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
