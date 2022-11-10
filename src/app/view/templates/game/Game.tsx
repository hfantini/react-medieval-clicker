import './Game.scss';
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoDialog from '../../components/infoDialog/InfoDialog';
import Loader from '../../components/loader/Loader';
import GameUI from './game-ui/GameUI';
import AccountService from '../../../service/AccountService';
import { Account } from '../../../model/Account';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Resources } from '../../../model/Resources';

function Game() 
{
  const accountService = new AccountService();
  
  const requestRef = React.useRef<number>()
  const requestLoadRef = React.useRef<boolean>(false);
  const accountRef = React.useRef<Account>(null);

  const [asyncProcessState, setAsyncProcessState] = useState<AsyncProcessState>({
    complete: false,
    success: false,
    message: null
  })

  const navigate = useNavigate();
  
  useEffect(() => 
  {
    requestRef.current = requestAnimationFrame(update);

    load().then( (account) =>
    {
      accountRef.current = account;

      setTimeout(() => {
        setAsyncProcessState({
          ...asyncProcessState,
          complete: true,
          success: true
        })
        requestLoadRef.current = true;
      }, 1000);
      
    }).catch( (e) =>
    {
      setAsyncProcessState({
        complete: true,
        success: false,
        message: e
      })
    });
    return () => cancelAnimationFrame(requestRef.current);
  }, [])

  let dispatch = useDispatch();
  let resources = useSelector((state:RootState) => {
    if(accountRef.current != null)
    {
      console.log(accountRef.current)
      accountRef.current.game.resources = new Resources(state.resources.food, state.resources.wood, state.resources.gold, state.resources.stone)
    }
    return state.resources;
  })

  const load = (): Promise<Account> =>
  {
    return new Promise<Account>( (resolve, reject) =>
    {
      try
      {
        let id = accountService.getCurrentLoggedAccount();
        
        if(id == null) {
          reject("Você não está logado");
        }

        accountService.load(id).then( (account) =>
        {
          resolve(account);
        } );
      } 
      catch(e)
      {
        reject(e);
      }  
    })
  }

  const save = (): Promise<void> =>
  {
    return null;
  }

  const update = (time:number) => 
  {
    if(requestLoadRef.current && accountRef.current) 
    {

    }

    requestRef.current = requestAnimationFrame(update);
  }

  const exit = () =>
  {
    navigate("/login", {replace: true});
  }

  const onDialogCloseClick = () =>
  {
    exit();
  }

  const onModalClose = () =>
  {
    exit();
  }

  return (
    <div className="GAME">
      { !asyncProcessState.complete && 
        <div className='GAME-LOADING'>
          <Loader width="5rem" height="5rem"/>
        </div>
      }
      { asyncProcessState.complete &&
        <React.Fragment>
          { asyncProcessState.success && 
            <GameUI></GameUI>
          }
          <Modal
          open={!asyncProcessState.success}
          onClose={onModalClose}>
            <InfoDialog onCloseClick={onDialogCloseClick}>
              {asyncProcessState.message}
            </InfoDialog>
          </Modal>
        </React.Fragment>
      }       
    </div>
  );
}

export default Game;
