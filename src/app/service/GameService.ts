import { Game } from "../model/Game";

export default class GameService
{
    private factor = 0.01;

    constructor()
    {
        
    }

    update(game:Game): Game 
    {
        let retValue:Game = new Game(game);
        let timeMultiplier = 1;
        let timeSinceLastSave = Date.now() - game.lastSaveTimestamp;
        if(Date.now() - game.lastSaveTimestamp > 1000)
        {
            let calculatedTimeMultiplier = Math.round(timeSinceLastSave / 1000);

            if(calculatedTimeMultiplier > 0)
            {
                timeMultiplier = calculatedTimeMultiplier;
            }
        }

        retValue.resources.food = (game.resources.food + (this.factor * timeMultiplier));
        retValue.resources.wood = (game.resources.wood + (this.factor * timeMultiplier));
        retValue.resources.gold = (game.resources.gold + (this.factor * timeMultiplier));
        retValue.resources.stone = (game.resources.stone + (this.factor * timeMultiplier));

        return retValue;
    }
}