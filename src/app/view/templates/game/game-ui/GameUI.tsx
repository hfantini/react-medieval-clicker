import React, { useEffect, useState } from 'react';
import GameOverview from '../game-overview/GameOverview';
import './GameUI.scss';

function GameUI() {

  const [loading, setLoading] = useState(true);
  
  return (
    <div className="GAME-UI">
      <GameOverview></GameOverview>
    </div>
  );
}

export default GameUI;
