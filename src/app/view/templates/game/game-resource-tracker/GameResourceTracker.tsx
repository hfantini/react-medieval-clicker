import './GameResourceTracker.scss';

import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../store/Store';

function GameResourceTracker(props: any) {
  const resource = useSelector((state: RootState) => {
    return state.resource;
  })

  return (
    <div className="GAME-RESOURCE-TRACKER">
      <div className="GAME-RESOURCE-TRACKER-CONTAINER GAME-RESOURCE-TRACKER-FOOD">
        <div className="GAME-RESOURCE-TRACKER-ICON"></div>
        <div className="GAME-RESOURCE-TRACKER-VALUE">{Math.floor(resource.food)}</div>
      </div>
      <div className="GAME-RESOURCE-TRACKER-CONTAINER GAME-RESOURCE-TRACKER-WOOD">
        <div className="GAME-RESOURCE-TRACKER-ICON"></div>
        <div className="GAME-RESOURCE-TRACKER-VALUE">{Math.floor(resource.wood)}</div>
      </div>
      <div className="GAME-RESOURCE-TRACKER-CONTAINER GAME-RESOURCE-TRACKER-STONE">
        <div className="GAME-RESOURCE-TRACKER-ICON"></div>
        <div className="GAME-RESOURCE-TRACKER-VALUE">{Math.floor(resource.gold)}</div>
      </div>
      <div className="GAME-RESOURCE-TRACKER-CONTAINER GAME-RESOURCE-TRACKER-GOLD">
        <div className="GAME-RESOURCE-TRACKER-ICON"></div>
        <div className="GAME-RESOURCE-TRACKER-VALUE">{Math.floor(resource.stone)}</div>
      </div>
    </div>
  );
}

export default GameResourceTracker;
