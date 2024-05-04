import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function GetStartedButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <a 
      href='https://app.zipreview.io'
      className='inline-flex w-3/5 text-center items-center justify-center rounded-md bg-cyan-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-cyan-500 ease-in-out duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
    > Get Started
    </a>
  )
}

export default GetStartedButton;