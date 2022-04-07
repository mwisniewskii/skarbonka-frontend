import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Register from "./components/pages/Register";
import ResetPassword from "./components/pages/ResetPassword";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/registerPanel" exact element={<Register />} />
          <Route path="/resetPasswordPanel" exact element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
