import { ResourceType } from "../enum/ResourceType";
import { UserAction } from "../enum/UserAction";
import { Game } from "../model/Game";
import { MarketItem } from "../model/MarketItem";
import { MarketPrice } from "../model/MarketPrice";
import { UserActionPayload } from "../store/payload/UserActionPayload";
import { VillagerWorkRestPayload } from "../store/payload/VillagerWorkRestPayload";

export default class GameService
{
    constructor()
    {
        
    }


    actionUpdate(actionPayload:UserActionPayload, game:Game): Game
    {
        let retValue:Game = game;

        switch(actionPayload.action)
        {
          case UserAction.INCREMENT_FOOD:
            retValue.resources.food += actionPayload.value;
            break;
  
          case UserAction.INCREMENT_WOOD:
            retValue.resources.wood += actionPayload.value;
            break;
              
          case UserAction.INCREMENT_STONE:
            retValue.resources.stone += actionPayload.value;
            break;
        
          case UserAction.INCREMENT_GOLD:
            retValue.resources.gold += actionPayload.value;
            break;
            
          case UserAction.BUY_ITEM:
            let item = actionPayload.value as MarketItem;

            for(let count = 0; count < 3; count++)
            {
                try
                {
                    if(count == 0)
                    {
                        for(let count2 = 0; count2 < item.price.length; count2++)
                        {
                            let price = item.price[count2] as MarketPrice

                            // CHECK IF RESOURCES ARE AVAILABLE
                            switch(price.resource)
                            {
                                case ResourceType.FOOD:
                                    if(game.resources.food < price.value)
                                    {
                                        throw "NOT_AVAILABLE_RESOURCE";
                                    }
                                    break;

                                case ResourceType.WOOD:
                                    if(game.resources.wood < price.value)
                                    {
                                        throw "NOT_AVAILABLE_RESOURCE";
                                    }                                    
                                    break;

                                case ResourceType.GOLD:
                                    if(game.resources.gold < price.value)
                                    {
                                        throw "NOT_AVAILABLE_RESOURCE";
                                    }                                    
                                    break;

                                case ResourceType.STONE:
                                    if(game.resources.stone < price.value)
                                    {
                                        throw "NOT_AVAILABLE_RESOURCE";
                                    }                                    
                                    break;
                            }
                        }
                    }
                    else if(count == 1)
                    {
                        for(let count2 = 0; count2 < item.price.length; count2++)
                        {
                            let price = item.price[count2] as MarketPrice

                            // DISCOUNT RESORCES
                            switch(price.resource)
                            {
                                case ResourceType.FOOD:
                                    retValue.resources.food -= price.value;
                                    break;

                                case ResourceType.WOOD:
                                    retValue.resources.wood -= price.value;                                 
                                    break;

                                case ResourceType.GOLD:
                                    retValue.resources.gold -= price.value;                                   
                                    break;

                                case ResourceType.STONE:
                                    retValue.resources.stone -= price.value;                                   
                                    break;
                            }
                        }
                    }
                    else if(count == 2)
                    {
                        switch(item.name)
                        {
                            case "Villager":
                                retValue.villagers.idle += 1;
                                break;

                            case "Wagon":
                                break;                                
                        }
                    }
                }
                catch(e)
                {
                    break;
                }
            }

            break;

            case UserAction.PUT_VILLAGER_TO_WORK:
                let villagerWorkPayload = actionPayload.value as VillagerWorkRestPayload;
                if(retValue.villagers.idle >= villagerWorkPayload.value)
                {
                    retValue.villagers.idle -= villagerWorkPayload.value;

                    switch(villagerWorkPayload.resource)
                    {
                        case ResourceType.FOOD:
                            retValue.villagers.alloc.food += villagerWorkPayload.value;
                            break;

                        case ResourceType.WOOD:
                            retValue.villagers.alloc.wood += villagerWorkPayload.value;                                
                            break;

                        case ResourceType.GOLD:
                            retValue.villagers.alloc.gold += villagerWorkPayload.value;                                   
                            break;

                        case ResourceType.STONE:
                            retValue.villagers.alloc.stone += villagerWorkPayload.value;                                   
                            break;
                    }
                }
                break;    
            
            case UserAction.PUT_VILLAGER_TO_REST:
                let villagerRestPayload = actionPayload.value as VillagerWorkRestPayload;
                switch(villagerRestPayload.resource)
                {
                    case ResourceType.FOOD:
                        if(retValue.villagers.alloc.food > 0)
                        {
                            retValue.villagers.alloc.food -= villagerRestPayload.value;
                            retValue.villagers.idle += villagerRestPayload.value;
                        }
                        break;

                    case ResourceType.WOOD:
                        if(retValue.villagers.alloc.wood)
                        {
                            retValue.villagers.alloc.wood -= villagerRestPayload.value;
                            retValue.villagers.idle += villagerRestPayload.value;
                        }
                        break;

                    case ResourceType.GOLD:
                        if(retValue.villagers.alloc.gold)
                        {
                            retValue.villagers.alloc.gold -= villagerRestPayload.value;
                            retValue.villagers.idle += villagerRestPayload.value;
                        }
                        break;

                    case ResourceType.STONE:
                        if(retValue.villagers.alloc.stone)
                        {
                            retValue.villagers.alloc.stone -= villagerRestPayload.value;
                            retValue.villagers.idle += villagerRestPayload.value;
                        }
                        break;
                }
                break;    
        }

        return retValue;
    }

    timeUpdate(game:Game): Game 
    {
        let retValue:Game = game;
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

        // CALCULATES RESOURCE FACTORS

        let factorFood = (0.01 + (retValue.villagers.alloc.food * 0.01))
        let factorWood = (0.01 + (retValue.villagers.alloc.wood * 0.01))
        let factorGold = (0.01 + (retValue.villagers.alloc.gold * 0.01))
        let factorStone = (0.01 + (retValue.villagers.alloc.stone * 0.01))

        // EXECUTE CHANGES

        retValue.resources.food = (game.resources.food + (factorFood * timeMultiplier));
        retValue.resources.wood = (game.resources.wood + (factorWood * timeMultiplier));
        retValue.resources.gold = (game.resources.gold + (factorGold * timeMultiplier));
        retValue.resources.stone = (game.resources.stone + (factorStone * timeMultiplier));

        return retValue;
    }
}