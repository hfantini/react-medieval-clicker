import './NewAccount.scss';
import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import InfoDialog from '../../components/infoDialog/InfoDialog';
import AccountService from '../../../service/AccountService';
import { Account } from '../../../model/Account';

function NewAccount() 
{
  let [formState, setFormState] = useState({
    fields: {
      name: {id: "name", label: "Name"},
      lastName: {id: "lastName", label: "Last Name"},
      mail: {id: "mail", label: "E-Mail"},
      password: {id: "password", label: "Password"},
      passwordConfirm: {id: "passwordConfirm", label: "Password Confirmation"},
    },
    values: {
      name: "",
      lastName: "",
      mail: "",
      password: "",
      passwordConfirm: ""
    },
    errors: {
      name: [],
      lastName: [],
      mail: [],
      password: [],
      passwordConfirm: [],
    }
  });

  let [processing, setProcessing] = useState<boolean>(false);
  let [complete, setComplete] = useState<boolean>(false);
  let accountService:AccountService = new AccountService();
  const navigate = useNavigate();

  const validate = ():boolean =>
  {
    let retValue = true;
    let newState = {...formState};

    // == NAME
    
    let valueError = [];
    let value = formState.values.name;

    if(value == null || value === "")
    {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    newState.errors.name = [...valueError];

    // == LASTNAME
    
    valueError = [];
    value = formState.values.lastName;

    if(value == null || value === "")
    {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    newState.errors.lastName = [...valueError];    

    // == MAIL
    
    valueError = [];
    value = formState.values.mail;

    if(value == null || value === "")
    {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    if( accountService.exists(value) ) 
    {
      valueError.push("This e-mail is already registered");
      retValue = false;
    }

    newState.errors.mail = [...valueError];       

    // == PASSWORD

    valueError = [];
    value = formState.values.password;

    if(value == null || value === "")
    {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    newState.errors.password = [...valueError];   

    // == PASSWORD CONFIRM

    valueError = [];
    value = formState.values.passwordConfirm;

    if(value == null || value === "")
    {
      valueError.push("This field cannot be empty")
      retValue = false;
    }

    // CHECK IF PASSWORDS MATCH
    if(formState.values.password !== value) {
      valueError.push("Passwords do not match")
      retValue = false;
    }

    newState.errors.passwordConfirm = [...valueError];
    setFormState(newState);

    return retValue;
  }

  const renderValidationErrors = (errors:Array<string>) => {
    let retValue: Array<any> = [];
    errors.forEach( (value, index) => {
      retValue.push(<li key={`li-naccount-${index}`}>{value}</li>)
    } )
    return retValue;
  }

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
  {    
    let newChange = {
      ...formState,
      values: {
        ...formState.values,
        [e.target.id]: e.target.value
      }
    }

    setFormState(newChange);
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => 
  {
    e.preventDefault();

    if (validate()) {
      setProcessing(true);
      let account = new Account( formState.values );
      accountService.save(account).then( () => 
      {
        setTimeout(() => {
          setProcessing(false);
          setComplete(true);
        }, 500);
      })
    };
  }

  const onModalClose = () => 
  {
    navigate("/login", {replace: true})
  }

  const onDialogCloseClick = () => 
  {
    navigate("/login", {replace: true})
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
              id="name" 
              label={formState.fields.name.label} 
              variant="standard" 
              fullWidth
              value={formState.values.name}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)}/>
              { formState.errors.name.length > 0 &&
                <div className="NEWACCOUNT-VALIDATION">
                  {renderValidationErrors(formState.errors.name)}
                </div>
              }
          </div>
          <div className="NEWACCOUNT-LASTNAME">
            <TextField 
              id="lastName" 
              label={formState.fields.lastName.label} 
              variant="standard" 
              fullWidth
              value={formState.values.lastName}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)}/>
              { formState.errors.lastName.length > 0 &&
                <div className="NEWACCOUNT-VALIDATION">
                  {renderValidationErrors(formState.errors.lastName)}
                </div>
              }              
          </div>          
          <div className="NEWACCOUNT-MAIL">
            <TextField 
              id="mail" 
              label={formState.fields.mail.label} 
              variant="standard" 
              fullWidth
              value={formState.values.mail}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)}/>
              { formState.errors.mail.length > 0 &&
                <div className="NEWACCOUNT-VALIDATION">
                  {renderValidationErrors(formState.errors.mail)}
                </div>
              }                       
          </div>          
          <div className="NEWACCOUNT-PASSWORD">
            <TextField 
              id="password" 
              type="password"
              label={formState.fields.password.label} 
              variant="standard" 
              fullWidth
              value={formState.values.password}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)}/>
              { formState.errors.password.length > 0 &&
                <div className="NEWACCOUNT-VALIDATION">
                  {renderValidationErrors(formState.errors.password)}
                </div>
              }                
          </div>
          <div className="NEWACCOUNT-PASSWORD-CONFIRM">
            <TextField 
              id="passwordConfirm" 
              type="password"
              label={formState.fields.passwordConfirm.label} 
              variant="standard" 
              fullWidth
              value={formState.values.passwordConfirm}
              disabled={processing}
              onChange={(evt) => onFieldChange(evt)}/>
              { formState.errors.passwordConfirm.length > 0 &&
                <div className="NEWACCOUNT-VALIDATION">
                  {renderValidationErrors(formState.errors.passwordConfirm)}
                </div>
              }                     
          </div>
          { !processing &&     
            <div className="NEWACCOUNT-OPTIONS">
              <Button type="submit" className="NEWACCOUNT-SUBMIT" variant="contained" fullWidth>SUBMIT</Button>
            </div>        
          }
          { processing &&    
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
