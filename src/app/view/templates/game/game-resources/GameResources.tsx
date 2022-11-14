import './GameResources.scss';
import React from 'react';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/Store';
import GameResource from '../../../components/game/game-resource/GameResource';
import { ResourceType } from '../../../../enum/ResourceType';


function GameResources() {

  const game = useSelector( (state:RootState) => {
    return state;
  } )

  return (
    <div className="GAME-RESOURCES">
      <div className="GAME-RESOURCES-TITLE">
        Resources
      </div>
      <div className="GAME-RESOURCES-VILLAGERS">
        <AccessibilityIcon/> {game.villager.idle}
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
