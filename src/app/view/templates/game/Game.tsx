import './Game.scss';
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoDialog from '../../components/infoDialog/InfoDialog';
import Loader from '../../components/loader/Loader';
import GameUI from './game-ui/GameUI';
import AccountService from '../../../service/AccountService';
import GameService from '../../../service/GameService';

function Game() 
{
  const accountService = new AccountService();
  const gameService = new GameService();
  const requestRef = React.useRef<number>()
  const requestLoadRef = React.useRef<boolean>(false);
  const accountRef = React.useRef<Account>(null);
  const [asyncProcessState, setAsyncProcessState] = useState<AsyncProcessState>({
    complete: false,
    success: false,
    message: null
  })
  const navigate = useNavigate();
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    load().then( () =>
    {
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

  const load = ():Promise<void> =>
  {
    return new Promise<void>( (resolve, reject) =>
    {
      try
      {
        let id = accountService.getCurrentLoggedAccount();
        
        if(id == null) {
          reject("Você não está logado");
        }

        accountService.load(id).then( (account) =>
        {
          accountRef.current = account;

          if(accountRef.current.gameProgress == null){
            accountRef.current.gameProgress = gameService.newGame();
          }

          resolve();
        } );
      } 
      catch(e)
      {
        reject(e);
      }  
    })
  }

  const update = (time:number) => 
  {
    if(requestLoadRef.current) {
      
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
