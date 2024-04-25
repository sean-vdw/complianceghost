import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function GetStartedButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button 
      type='button'
      className='inline-flex w-3/5 text-center items-center justify-center rounded-md bg-cyan-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-cyan-500 hover:scale-105 ease-in-out duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
      onClick={() => loginWithRedirect()}
      >Get Started
    </button>
  )
}

export default GetStartedButton;