import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';

function Login() 
{
  const navigate = useNavigate();
  const [formState, setFormState] = useState( {
      values: {
        user: "User",
        pass: "Password"
      },
      errors: {}
  });

  const handleValidation = () =>
  {

  }

  const handleChange = () => 
  {

  }

  const handleSubmit = () => 
  {
    
  }

  return (
    <div className="LOGIN">
      <div className="LOGIN-TOP">
        <div className="LOGIN-IMAGE">
          <img />
        </div>
        <div className="LOGIN-TITLE">
          Medieval Clicker
        </div>
      </div>
      <div className="LOGIN-CONTENT">
        <form className='LOGIN-FORM' onSubmit={handleSubmit}>
          <div className="LOGIN-FIELD-USER">
            <TextField id="user" label={formState.values.user} variant="standard" fullWidth />
          </div>
          <div className="LOGIN-FIELD-PASSWORD">
            <TextField id="password" label={formState.values.pass} variant="standard" fullWidth />
          </div>
          <div className="LOGIN-OPTIONS">
            <Button className="LOGIN-BUTTON-NEWACCOUNT" variant="contained" fullWidth onClick={() => navigate("/new-account", {replace: false})}>Create Account</Button>
            <Button className="LOGIN-BUTTON-ENTER" variant="contained"><LoginIcon/></Button>
          </div>          
          <div className="LOGIN-FORGOT-PASSWORD">
            <p>Forgot your password? <Link to="/password-reset">Click Here!</Link></p>
          </div>                 
        </form>
      </div>
    </div>
  );
}

export default Login;
