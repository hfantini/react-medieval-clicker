import React, { useState } from 'react';
import GameMarket from '../game-market/GameMarket';
import GameResourceTracker from '../game-resource-tracker/GameResourceTracker';
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
    <div className={`GAME-UI ${selectedOption != "resources" ? 'TRACK-RESOURCES' : ''}`}>
      <div className={"GAME-UI-HEADER"}>
        <GameResourceTracker></GameResourceTracker>
      </div>
      <div className="GAME-UI-CONTENT">
        <div className="GAME-UI-NAV">
          <GameSidebar selected={selectedOption} onSelect={onSidebarItemClick}></GameSidebar>
        </div>
        <div className="GAME-UI-PAGE">
        { selectedOption == "resources" &&
          <GameResources></GameResources>
        }
        { selectedOption == "market" &&
          <GameMarket></GameMarket>
        }
        { selectedOption == "upgrades" &&
          <GameUpgrades></GameUpgrades>
        }      
        </div>
      </div>
    </div>
  );
}

export default GameUI;
