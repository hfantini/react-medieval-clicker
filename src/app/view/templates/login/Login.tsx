import './Login.scss';
import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import InfoDialog from '../../components/infoDialog/InfoDialog';

function Login() 
{
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
  {
      values: 
      {
        user: "User",
        pass: "Password"
      },
      errors: {}
  });
  const [processing, setProcessing] = useState<boolean>(false)
  const [completed, setCompleted] = useState( {
    complete: false,
    success: false,
    message: ""
  }) 

  const handleValidation = () =>
  {

  }

  const handleChange = () => 
  {

  }

  const onFormSubmit = (e:React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();

    setCompleted({
      complete: true,
      success: false,
      message: "teste123"
    })
  }

  const onDialogCloseClick = () =>
  {
    setCompleted({
      ...completed,
      complete: false
    });
  }

  const onModalClose = () =>
  {
    setCompleted({
      ...completed,
      complete: false
    });
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
        <form className='LOGIN-FORM' onSubmit={(evt) => onFormSubmit(evt)}>
          <div className="LOGIN-FIELD-USER">
            <TextField 
              id="user" 
              label={formState.values.user} 
              variant="standard"
              disabled={processing}
              fullWidth />
          </div>
          <div className="LOGIN-FIELD-PASSWORD">
            <TextField 
              id="password" 
              type="password"
              label={formState.values.pass} 
              variant="standard" 
              disabled={processing}
              fullWidth />
          </div>
          { !processing &&
            <div className="LOGIN-OPTIONS">
              <div className="LOGIN-BUTTON">
                <Button 
                  className="LOGIN-BUTTON-NEWACCOUNT" 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => navigate("/new-account", {replace: false})}>
                    Create Account
                </Button>
                <Button 
                  type="submit"
                  className="LOGIN-BUTTON-ENTER" 
                  variant="contained">
                    <LoginIcon/>
                </Button>   
              </div>     
              <div className="LOGIN-FORGOT-PASSWORD">
                <p>Forgot your password? <Link to="/password-reset">Click Here!</Link></p>
              </div>      
            </div>  
          }
          { processing && 
            <div className="LOGIN-LOADER">
              <Loader width={"3rem"} height={"3rem"} />
            </div>
          }        
        </form>
        <Modal
          open={completed.complete && !completed.success}
          onClose={onModalClose}>
            <InfoDialog onCloseClick={onDialogCloseClick}>
              {completed.message}
            </InfoDialog>
        </Modal> 
      </div>
    </div>
  );
}

export default Login;
