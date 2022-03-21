import React from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom'

function LoginPanel () {
  return (
    <>
      <div className='login-container'>
        <Link to='/' className='login-link'>
          Logowanie
        </Link>
        <Link to='/register' className='login-link'>
          Rejestracja
        </Link>
        <Button buttonStyle='btn--outline'>
          Zaloguj sie
        </Button>
      </div>
    </>
  );
}

export default LoginPanel;