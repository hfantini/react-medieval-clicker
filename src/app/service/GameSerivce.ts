import { Account } from "../model/Account";
import { Game } from "../model/Game";
import AccountRepository from "../repository/AccountRepository";

export default class GameService
{
    private factor = 0.01;

    constructor()
    {
        
    }

    update(game:Game): Game {

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

        game.resources.food += this.factor * timeMultiplier;
        game.resources.wood += this.factor * timeMultiplier;
        game.resources.gold += this.factor * timeMultiplier;
        game.resources.stone += this.factor * timeMultiplier;

        return game;
    }
}