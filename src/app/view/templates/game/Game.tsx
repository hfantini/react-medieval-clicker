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
import { set } from '../../../state/resources/ResourcesSlicer';
import GameService from '../../../service/GameSerivce';

function Game() 
{
  const accountService = new AccountService();
  const gameService = new GameService();
  const requestLoadRef = React.useRef<boolean>(false);
  const accountRef = React.useRef<Account>(null);
  const [asyncProcessState, setAsyncProcessState] = useState<AsyncProcessState>({
    complete: false,
    success: false,
    message: null
  })
  const navigate = useNavigate();
  let intervalRef:any = 0;

  const dispatch = useDispatch();

  const resources = useSelector((state:RootState) => {
    return state.resources;
  })

  useEffect(() => 
  {
    intervalRef = setInterval(update, 60);

    load().then( (account) =>
    {
      accountRef.current = account;

      setInterval(() => {
        setAsyncProcessState({
          ...asyncProcessState,
          complete: true,
          success: true
        })
        requestLoadRef.current = true;
      }, 3000);
      
    }).catch( (e) =>
    {
      setAsyncProcessState({
        complete: true,
        success: false,
        message: e
      })
    });
    return () => {
      clearInterval(intervalRef);
    }
  }, [])

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

  const save = (account:Account): Promise<Account> =>
  {
    account.game.lastSaveTimestamp = Date.now();
    return accountService.save(account);
  }

  const update = () => 
  {
    if(accountRef.current) 
    {
      accountRef.current.game = gameService.update(accountRef.current.game);

      save(accountRef.current).then( (account:Account) =>
      {
        dispatch(set(
          {
            food: accountRef.current.game.resources.food, 
            wood: accountRef.current.game.resources.wood, 
            gold: accountRef.current.game.resources.gold, 
            stone: accountRef.current.game.resources.stone
          })
        )
      })
    }
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
          <div>FOOD: {Math.floor(resources.food)}</div>
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
