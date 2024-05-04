import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <a href='https://app.zipreview.io'>
      <button 
        type='button'
        className='rounded-md bg-cyan-50 px-3 py-2 text-sm font-semibold text-cyan-700 shadow-sm hover:bg-cyan-100'
        >Sign Up
      </button>
    </a>
  )
}

export default SignUpButton;