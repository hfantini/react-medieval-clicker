import './GameResources.scss';

import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import React from 'react';
import { useSelector } from 'react-redux';

import { ResourceType } from '../../../../enum/ResourceType';
import { RootState } from '../../../../store/Store';
import GameResource from '../../../components/game/game-resource/GameResource';

function GameResources() {

  const game = useSelector((state: RootState) => {
    return state;
  })

  return (
    <div className="GAME-RESOURCES">
      <div className="GAME-RESOURCES-TITLE">
        Resources
      </div>
      <div className="GAME-RESOURCES-VILLAGERS">
        <div className="GAME-RESOURCES-VILLAGERS-CONTAINER"><AccessibilityIcon /> {game.villager.idle}</div>
        <div className="GAME-RESOURCES-VILLAGERS-CONTAINER"><AgricultureIcon /> {game.wagon.idle}</div>
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
