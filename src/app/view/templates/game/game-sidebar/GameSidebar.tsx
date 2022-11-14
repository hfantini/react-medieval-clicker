import './GameSidebar.scss';
import React, { useEffect } from 'react';
import PaidIcon from '@mui/icons-material/Paid';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

function GameSidebar(props:any) 
{
  useEffect(() => {
    console.log(props);
  }, [])
  
  const onItemClick = (value:any) =>
  {
    props.onSelect(value);
  }

  return (
    <div className="GAME-SIDEBAR">
      <div id=""
           className = {`GAME-SIDEBAR-BUTTON ${props.selected == 'resources' ? "SELECTED" : ''}`}
           onClick={(evt) => onItemClick("resources")}
      >
        <PaidIcon/>
      </div>
      
      <div id=""
           className ={`GAME-SIDEBAR-BUTTON ${props.selected == 'upgrades' ? "SELECTED" : ''}`}
           onClick={(evt) => onItemClick("upgrades")}
      >
        <ManageHistoryIcon/>
      </div>
    </div>
  );
}

export default GameSidebar;
