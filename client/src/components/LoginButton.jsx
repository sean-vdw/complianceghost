import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button 
      type='button'
      className='-mx-3 block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50'
      onClick={() => loginWithRedirect()}
      >Log In <span aria-hidden="true">&rarr;</span>
    </button>
  )
}

export default LoginButton;