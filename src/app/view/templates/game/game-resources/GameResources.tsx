import './GameResources.scss';
import React from 'react';
import { ResourceType } from '../../../../enum/ResourceType';
import GameResource from '../../../components/game/game-resource/GameResource';


function GameResources() {

  return (
    <div className="GAME-RESOURCES">
      <div className="GAME-RESOURCES-TITLE">
        Resources
      </div>
      <div className="GAME-RESOURCES-CONTENT">
        <div className="GAME-RESOURCES-ROW">
          <div className="GAME-RESOURCES-CELL GAME-RESOURCES-FOOD">
            <GameResource type={ResourceType.FOOD}></GameResource>
          </div>
          <div className="GAME-RESOURCES-CELL GAME-RESOURCES-WOOD">
            <GameResource type={ResourceType.WOOD}></GameResource>
          </div>          
        </div>
        <div className="GAME-RESOURCES-ROW">
          <div className="GAME-RESOURCES-CELL GAME-RESOURCES-GOLD">
            <GameResource type={ResourceType.GOLD}></GameResource>
          </div>
          <div className="GAME-RESOURCES-CELL GAME-RESOURCES-STONE">
            <GameResource type={ResourceType.STONE}></GameResource>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default GameResources;
