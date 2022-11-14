import './GameResource.scss';
import React from 'react';
import { ResourceType } from '../../../../enum/ResourceType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/Store';
import { UserAction, UserAction as UserActionType } from '../../../../enum/UserAction';
import { userAction } from '../../../../store/slicer/UserActionSlicer';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function GameResource(props:any) {

  const dispatch = useDispatch();
  const game = useSelector( (state:RootState) => {
    return state;
  } )

  const convertResourceTypeToName = (type:ResourceType) =>
  {
    switch(type)
    {
      case ResourceType.FOOD:
      return "food";

      case ResourceType.WOOD:
      return "wood";
      
      case ResourceType.GOLD:
        return "gold";

      case ResourceType.STONE:
        return "stone";        
    }
  }

  const onResourceClick = () => {
    switch(props.type)
    {
      case ResourceType.FOOD:
        dispatch(userAction({action: UserActionType.INCREMENT_FOOD, value: 1}))
        break;

      case ResourceType.WOOD:
        dispatch(userAction({action: UserActionType.INCREMENT_WOOD, value: 1}))
        break;
      
      case ResourceType.GOLD:
        dispatch(userAction({action: UserActionType.INCREMENT_GOLD, value: 1}))
        break;
      
      case ResourceType.STONE:
        dispatch(userAction({action: UserActionType.INCREMENT_STONE, value: 1}))
        break;
    }
  }

  const onAddClick = () =>
  {
    dispatch(userAction(
      {
        action: UserAction.PUT_VILLAGER_TO_WORK,
        value: {
          resource: props.type,
          value: 1
        }
      })
    )
  }

  const onRemoveClick = () =>
  {
    dispatch(userAction(
      {
        action: UserAction.PUT_VILLAGER_TO_REST,
        value: {
          resource: props.type,
          value: 1
        }
      })
    )
  }  

  return (
    <div id={`game-resouce-${props.type}`} className="GAME-RESOURCE">
      <div className="GAME-RESOURCE-VALUE">
        {Math.floor(game.resource[convertResourceTypeToName(props.type)])}
      </div>
      <div 
        className={`GAME-RESOURCE-BUTTON type-${props.type}`}
        onClick={onResourceClick}>
      </div>
      <div className="GAME-RESOURCE-VILLAGER">
        <PersonIcon/> {game.villager.alloc[convertResourceTypeToName(props.type)]}
      </div>
      <div className="GAME-RESOURCE-CONTROL">
        <div className="GAME-RESOURCE-BUTTON" onClick={onAddClick}>
          <AddIcon/>
        </div>
        <div className="GAME-RESOURCE-BUTTON" onClick={onRemoveClick}>
          <RemoveIcon/>
        </div>
      </div>      
    </div>
  );
}

export default GameResource;
