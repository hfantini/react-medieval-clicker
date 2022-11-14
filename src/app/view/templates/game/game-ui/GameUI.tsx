import React, { useState } from 'react';
import GameResources from '../game-resources/GameResources';
import GameSidebar from '../game-sidebar/GameSidebar';
import GameUpgrades from '../game-upgrades/GameUpgrades';
import './GameUI.scss';

function GameUI() {

  const [selectedOption, setSelectedOption] = useState("resources");

  const onSidebarItemClick = (item:string) => 
  {
    setSelectedOption(item);
  }

  return (
    <div className="GAME-UI">
      <div className="GAME-UI-NAV">
        <GameSidebar selected={selectedOption} onSelect={onSidebarItemClick}></GameSidebar>
      </div>
      <div className="GAME-UI-PAGE">
      { selectedOption == "resources" &&
        <GameResources></GameResources>
      }
      { selectedOption == "upgrades" &&
        <GameUpgrades></GameUpgrades>
      }      
      </div>
    </div>
  );
}

export default GameUI;
