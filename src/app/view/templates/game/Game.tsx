import './Game.scss';
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoDialog from '../../components/infoDialog/InfoDialog';
import Loader from '../../components/loader/Loader';
import GameUI from './game-ui/GameUI';
import AccountService from '../../../service/AccountService';
import { Account } from '../../../model/Account';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import GameService from '../../../service/GameService';
import { RootState } from '../../../store/Store';
import { set } from '../../../store/slicer/ResourceSlicer';
import { UserActionPayload } from '../../../store/payload/UserActionPayload';
import { UserAction } from '../../../enum/UserAction';
import { userAction } from '../../../store/slicer/UserActionSlicer';

function Game() 
{
  const accountService = new AccountService();
  const gameService = new GameService();
  const requestLoadRef = React.useRef<boolean>(false);
  const accountRef = React.useRef<Account>(null);
  const userActionRef = React.useRef<UserActionPayload>(null);
  const [asyncProcessState, setAsyncProcessState] = useState<AsyncProcessState>({
    complete: false,
    success: false,
    message: null
  })
  const navigate = useNavigate();
  let intervalRef:any = 0;

  const dispatch = useDispatch();
  const state = useSelector((state:RootState) => {
    userActionRef.current = state.userAction;
    return state;
  }, shallowEqual)

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
      //CHECKING FOR USERS ACTION

      switch(userActionRef.current.action)
      {
        case UserAction.INCREMENT_FOOD:
          accountRef.current.game.resources.food += userActionRef.current.value;
          dispatch(userAction({action: UserAction.NONE, value: 0}))
          break;

        case UserAction.INCREMENT_WOOD:
          accountRef.current.game.resources.wood += userActionRef.current.value;
          dispatch(userAction({action: UserAction.NONE, value: 0}))
          break;
            
        case UserAction.INCREMENT_STONE:
          accountRef.current.game.resources.stone += userActionRef.current.value;
          dispatch(userAction({action: UserAction.NONE, value: 0}))
          break;
      
        case UserAction.INCREMENT_GOLD:
          accountRef.current.game.resources.gold += userActionRef.current.value;
          dispatch(userAction({action: UserAction.NONE, value: 0}))
          break;              
      }

      // UPDATING OVER TIME

      accountRef.current.game = gameService.update(accountRef.current.game);

      save(accountRef.current).then( (account:Account) =>
      {
        dispatch(
          set(
            {
              food: account.game.resources.food, 
              wood: account.game.resources.wood, 
              gold: account.game.resources.gold, 
              stone: account.game.resources.stone
            }
          )
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
