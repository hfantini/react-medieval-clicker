import './GameResource.scss';
import React from 'react';
import { ResourceType } from '../../../../enum/ResourceType';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/Store';
import { UserAction as UserActionType } from '../../../../enum/UserAction';
import { userAction } from '../../../../store/slicer/UserActionSlicer';

function GameResource(props:any) {

  const dispatch = useDispatch();
  const value = useSelector( (state:RootState) => {
    console.log(state.resource);
    switch(props.type)
    {
      case ResourceType.FOOD:
        return state.resource.food;

      case ResourceType.WOOD:
        return state.resource.wood;
      
      case ResourceType.GOLD:
        return state.resource.gold;
      
      case ResourceType.STONE:
        return state.resource.stone;  
    }
  } )

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

  return (
    <div id={`game-resouce-${props.type}`} className="GAME-RESOURCE">
      <div className="GAME-RESOURCE-VALUE">
        {Math.floor(value)}
      </div>
      <div 
        className={`GAME-RESOURCE-BUTTON type-${props.type}`}
        onClick={onResourceClick}>
      </div>
    </div>
  );
}

export default GameResource;
