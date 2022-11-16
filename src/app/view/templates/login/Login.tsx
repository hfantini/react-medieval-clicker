import './Login.scss';

import LoginIcon from '@mui/icons-material/Login';
import { Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Account } from '../../../model/Account';
import AccountService from '../../../service/AccountService';
import InfoDialog from '../../components/infoDialog/InfoDialog';
import Loader from '../../components/loader/Loader';

function Login() {
  const accountService: AccountService = new AccountService();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [processing, setProcessing] = useState<boolean>(false)
  const [asyncProcessState, setAsyncProcessState] = useState<AsyncProcessState>({
    complete: false,
    success: false,
    message: ""
  })

  const onDialogCloseClick = () => {
    setAsyncProcessState({
      ...asyncProcessState,
      complete: false
    });
  }

  const onModalClose = () => {
    setAsyncProcessState({
      ...asyncProcessState,
      complete: false
    });
  }

  const onFormSubmit = (data: any) => {
    setProcessing(true);
    accountService.login(data.email, data.password).then((account: Account) => {
      setTimeout(() => {
        navigate("/game", { replace: true })
      }, 1000);
    }).catch((e) => {
      setProcessing(false);
      setAsyncProcessState(
        {
          complete: true,
          success: false,
          message: e
        }
      )
    })
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
        <form className='LOGIN-FORM' onSubmit={handleSubmit(onFormSubmit)}>
          <div className="LOGIN-FIELD-USER">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              disabled={processing}
              {...register("email", { required: true })}
              fullWidth />
            {errors.email &&
              <div className="LOGIN-VALIDATION">
                {errors.email.type == "required" && <div>This field if required</div>}
              </div>
            }
          </div>
          <div className="LOGIN-FIELD-PASSWORD">
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="standard"
              disabled={processing}
              {...register("password", { required: true })}
              fullWidth />
            {errors.pass &&
              <div className="LOGIN-VALIDATION">
                {errors.pass.type == "required" && <div>This field if required</div>}
              </div>
            }
          </div>
          {!processing &&
            <div className="LOGIN-OPTIONS">
              <div className="LOGIN-BUTTON">
                <Button
                  className="LOGIN-BUTTON-NEWACCOUNT"
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/new-account", { replace: false })}>
                  Create Account
                </Button>
                <Button
                  type="submit"
                  className="LOGIN-BUTTON-ENTER"
                  variant="contained">
                  <LoginIcon />
                </Button>
              </div>
              <div className="LOGIN-FORGOT-PASSWORD">
                <p>Forgot your password? <Link to="/password-reset">Click Here!</Link></p>
              </div>
            </div>
          }
          {processing &&
            <div className="LOGIN-LOADER">
              <Loader width={"3rem"} height={"3rem"} />
            </div>
          }
        </form>
        <Modal
          open={asyncProcessState.complete && !asyncProcessState.success}
          onClose={onModalClose}>
          <InfoDialog onCloseClick={onDialogCloseClick}>
            {asyncProcessState.message}
          </InfoDialog>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
