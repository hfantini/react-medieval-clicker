import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import './Splash.scss';

function Splash() 
{
  const [redirectNow, setRedirectNow] = useState(false);
  setTimeout(() => setRedirectNow(true), 2000);

  return redirectNow ? (
    <Navigate to="/login" replace={true} />
  ) : (    
    <div className="SPLASH">
      <div className="SPLASH-WRAPPER">
        <Loader width={"5rem"} height={"5rem"} />
      </div>
    </div>
  );
}

export default Splash;
