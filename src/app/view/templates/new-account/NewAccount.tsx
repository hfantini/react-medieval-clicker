import './NewAccount.scss';

import { Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Account } from '../../../model/Account';
import AccountService from '../../../service/AccountService';
import InfoDialog from '../../components/infoDialog/InfoDialog';
import Loader from '../../components/loader/Loader';

function NewAccount() {
  let [formState, setFormState] = useState({
    fields: {
      name: { id: "_name", label: "Name" },
      lastName: { id: "_lastName", label: "Last Name" },
      mail: { id: "_email", label: "E-Mail" },
      password: { id: "_password", label: "Password" },
      passwordConfirm: { id: "_passwordConfirm", label: "Password Confirmation" },
    },
    values: {
      _name: "",
      _lastName: "",
      _email: "",
      _password: "",
      _passwordConfirm: ""
    },
    errors: {
      _name: [],
      _lastName: [],
      _email: [],
      _password: [],
      _passwordConfirm: [],
    }
  });

  let [processing, setProcessing] = useState<boolean>(false);
  let [complete, setComplete] = useState<boolean>(false);
  let accountService: AccountService = new AccountService();
  const navigate = useNavigate();

  const validate = (): boolean => {
    let retValue = true;
    let newState = { ...formState };

    // == NAME

    let valueError = [];
    let value = formState.values._name;

    if (value == null || value === "") {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    newState.errors._name = [...valueError];

    // == LASTNAME

    valueError = [];
    value = formState.values._lastName;

    if (value == null || value === "") {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    newState.errors._lastName = [...valueError];

    // == MAIL

    valueError = [];
    value = formState.values._email;

    if (value == null || value === "") {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    if (accountService.exists(value)) {
      valueError.push("This e-mail is already registered");
      retValue = false;
    }

    newState.errors._email = [...valueError];

    // == PASSWORD

    valueError = [];
    value = formState.values._password;

    if (value == null || value === "") {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    newState.errors._password = [...valueError];

    // == PASSWORD CONFIRM

    valueError = [];
    value = formState.values._passwordConfirm;

    if (value == null || value === "") {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    // CHECK IF PASSWORDS MATCH
    if (formState.values._password !== value) {
      valueError.push("Passwords do not match")
      retValue = false;
    }

    newState.errors._passwordConfirm = [...valueError];
    setFormState(newState);

    return retValue;
  }

  const renderValidationErrors = (errors: Array<string>) => {
    let retValue: Array<any> = [];
    errors.forEach((value, index) => {
      retValue.push(<li key={`li-naccount-${index}`}>{value}</li>)
    })
    return retValue;
  }

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newChange = {
      ...formState,
      values: {
        ...formState.values,
        [e.target.id]: e.target.value
      }
    }

    setFormState(newChange);
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setProcessing(true);
      let account = new Account(formState.values);
      accountService.save(account).then(() => {
        setTimeout(() => {
          setProcessing(false);
          setComplete(true);
        }, 500);
      })
    };
  }

  const onModalClose = () => {
    navigate("/login", { replace: true })
  }

  const onDialogCloseClick = () => {
    navigate("/login", { replace: true })
  }

  return (
    <div className="NEWACCOUNT">
      <div className="NEWACCOUNT-HEADER">
        <div className="NEWACCOUNT-TITLE">
          Create Account
        </div>
        <div className="NEWACCOUNT-DESC">
          Join to us in an incredible adventure!
        </div>
      </div>
      <div className="NEWACCOUNT-CONTENT">
        <form className='NEWACCOUNT-FORM' onSubmit={(evt) => onFormSubmit(evt)}>
          <div className="NEWACCOUNT-NAME">
            <TextField
              id="_name"
              label={formState.fields.name.label}
              variant="standard"
              fullWidth
              value={formState.values._name}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)} />
            {formState.errors._name.length > 0 &&
              <div className="NEWACCOUNT-VALIDATION">
                {renderValidationErrors(formState.errors._name)}
              </div>
            }
          </div>
          <div className="NEWACCOUNT-LASTNAME">
            <TextField
              id="_lastName"
              label={formState.fields.lastName.label}
              variant="standard"
              fullWidth
              value={formState.values._lastName}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)} />
            {formState.errors._lastName.length > 0 &&
              <div className="NEWACCOUNT-VALIDATION">
                {renderValidationErrors(formState.errors._lastName)}
              </div>
            }
          </div>
          <div className="NEWACCOUNT-MAIL">
            <TextField
              id="_email"
              label={formState.fields.mail.label}
              variant="standard"
              fullWidth
              value={formState.values._email}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)} />
            {formState.errors._email.length > 0 &&
              <div className="NEWACCOUNT-VALIDATION">
                {renderValidationErrors(formState.errors._email)}
              </div>
            }
          </div>
          <div className="NEWACCOUNT-PASSWORD">
            <TextField
              id="_password"
              type="password"
              label={formState.fields.password.label}
              variant="standard"
              fullWidth
              value={formState.values._password}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)} />
            {formState.errors._password.length > 0 &&
              <div className="NEWACCOUNT-VALIDATION">
                {renderValidationErrors(formState.errors._password)}
              </div>
            }
          </div>
          <div className="NEWACCOUNT-PASSWORD-CONFIRM">
            <TextField
              id="_passwordConfirm"
              type="password"
              label={formState.fields.passwordConfirm.label}
              variant="standard"
              fullWidth
              value={formState.values._passwordConfirm}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)} />
            {formState.errors._passwordConfirm.length > 0 &&
              <div className="NEWACCOUNT-VALIDATION">
                {renderValidationErrors(formState.errors._passwordConfirm)}
              </div>
            }
          </div>
          {!processing &&
            <div className="NEWACCOUNT-OPTIONS">
              <Button type="submit" className="NEWACCOUNT-SUBMIT" variant="contained" fullWidth>SUBMIT</Button>
            </div>
          }
          {processing &&
            <div className="NEWACCOUNT-LOADER">
              <Loader width={"3rem"} height={"3rem"} />
            </div>
          }
          <Modal
            open={complete}
            onClose={onModalClose}>
            <InfoDialog
              onCloseClick={onDialogCloseClick}>
              <div>Account created sucessfully</div>
            </InfoDialog>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default NewAccount;
