import React from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom'
import "./LoginPanel.css";

function LoginPanel () {
  return (
    <>
      <main>
        <div className="wrap">
          <div className="panel">
            <div className="selectionPanel">
              <Link to="/" className="login-link">
                <div>Logowanie</div>
              </Link>
              <Link to="/register" className="register-link">
                <div>Utwórz konto</div>
              </Link>
            </div>
            <form action="POST">
              <input placeholder="E-mail" type="text" name="e-mail" />
              <input placeholder="Hasło" type="text" name="haslo" />
              <Link to="/resetPassword" className="resetPasword-link">
                <p>Zapomniałeś hasła?</p>
              </Link>
              <Link to="/loggedParent" className="loggedParent-link">
                <button>Zaloguj się</button>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginPanel;