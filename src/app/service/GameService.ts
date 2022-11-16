import { ResourceType } from "../enum/ResourceType";
import { UserAction } from "../enum/UserAction";
import { Game } from "../model/Game";
import { MarketItem } from "../model/MarketItem";
import { MarketPrice } from "../model/MarketPrice";
import { UserActionPayload } from "../store/payload/UserActionPayload";
import { WorkRestPayload } from "../store/payload/WorkRestPayload";

export default class GameService {
    constructor() {

    }


    actionUpdate(actionPayload: UserActionPayload, game: Game): Game {
        let retValue: Game = game;

        switch (actionPayload.action) {
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

                for (let count = 0; count < 3; count++) {
                    try {
                        if (count == 0) {
                            for (let count2 = 0; count2 < item.price.length; count2++) {
                                let price = item.price[count2] as MarketPrice

                                // CHECK IF RESOURCES ARE AVAILABLE
                                switch (price.resource) {
                                    case ResourceType.FOOD:
                                        if (game.resources.food < price.value) {
                                            throw "NOT_AVAILABLE_RESOURCE";
                                        }
                                        break;

                                    case ResourceType.WOOD:
                                        if (game.resources.wood < price.value) {
                                            throw "NOT_AVAILABLE_RESOURCE";
                                        }
                                        break;

                                    case ResourceType.GOLD:
                                        if (game.resources.gold < price.value) {
                                            throw "NOT_AVAILABLE_RESOURCE";
                                        }
                                        break;

                                    case ResourceType.STONE:
                                        if (game.resources.stone < price.value) {
                                            throw "NOT_AVAILABLE_RESOURCE";
                                        }
                                        break;
                                }
                            }
                        }
                        else if (count == 1) {
                            for (let count2 = 0; count2 < item.price.length; count2++) {
                                let price = item.price[count2] as MarketPrice

                                // DISCOUNT RESORCES
                                switch (price.resource) {
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
                        else if (count == 2) {
                            switch (item.name) {
                                case "Villager":
                                    retValue.work.villagers.idle += 1;
                                    break;

                                case "Wagon":
                                    retValue.work.wagons.idle += 1;
                                    break;
                            }
                        }
                    }
                    catch (e) {
                        break;
                    }
                }

                break;

            case UserAction.PUT_VILLAGER_TO_WORK:
                let villagerWorkPayload = actionPayload.value as WorkRestPayload;
                if (retValue.work.villagers.idle >= villagerWorkPayload.value) {
                    retValue.work.villagers.idle -= villagerWorkPayload.value;

                    switch (villagerWorkPayload.resource) {
                        case ResourceType.FOOD:
                            retValue.work.villagers.alloc.food += villagerWorkPayload.value;
                            break;

                        case ResourceType.WOOD:
                            retValue.work.villagers.alloc.wood += villagerWorkPayload.value;
                            break;

                        case ResourceType.GOLD:
                            retValue.work.villagers.alloc.gold += villagerWorkPayload.value;
                            break;

                        case ResourceType.STONE:
                            retValue.work.villagers.alloc.stone += villagerWorkPayload.value;
                            break;
                    }
                }
                break;

            case UserAction.PUT_VILLAGER_TO_REST:
                let villagerRestPayload = actionPayload.value as WorkRestPayload;
                switch (villagerRestPayload.resource) {
                    case ResourceType.FOOD:
                        if (retValue.work.villagers.alloc.food > 0) {
                            retValue.work.villagers.alloc.food -= villagerRestPayload.value;
                            retValue.work.villagers.idle += villagerRestPayload.value;
                        }
                        break;

                    case ResourceType.WOOD:
                        if (retValue.work.villagers.alloc.wood) {
                            retValue.work.villagers.alloc.wood -= villagerRestPayload.value;
                            retValue.work.villagers.idle += villagerRestPayload.value;
                        }
                        break;

                    case ResourceType.GOLD:
                        if (retValue.work.villagers.alloc.gold) {
                            retValue.work.villagers.alloc.gold -= villagerRestPayload.value;
                            retValue.work.villagers.idle += villagerRestPayload.value;
                        }
                        break;

                    case ResourceType.STONE:
                        if (retValue.work.villagers.alloc.stone) {
                            retValue.work.villagers.alloc.stone -= villagerRestPayload.value;
                            retValue.work.villagers.idle += villagerRestPayload.value;
                        }
                        break;
                }
                break;

            case UserAction.PUT_WAGON_TO_WORK:
                let wagonWorkPayload = actionPayload.value as WorkRestPayload;
                if (retValue.work.wagons.idle >= wagonWorkPayload.value) {
                    retValue.work.wagons.idle -= wagonWorkPayload.value;

                    switch (wagonWorkPayload.resource) {
                        case ResourceType.FOOD:
                            retValue.work.wagons.alloc.food += wagonWorkPayload.value;
                            break;

                        case ResourceType.WOOD:
                            retValue.work.wagons.alloc.wood += wagonWorkPayload.value;
                            break;

                        case ResourceType.GOLD:
                            retValue.work.wagons.alloc.gold += wagonWorkPayload.value;
                            break;

                        case ResourceType.STONE:
                            retValue.work.wagons.alloc.stone += wagonWorkPayload.value;
                            break;
                    }
                }
                break;

            case UserAction.PUT_WAGON_TO_REST:
                let wagonRestPayload = actionPayload.value as WorkRestPayload;
                switch (wagonRestPayload.resource) {
                    case ResourceType.FOOD:
                        if (retValue.work.wagons.alloc.food > 0) {
                            retValue.work.wagons.alloc.food -= wagonRestPayload.value;
                            retValue.work.wagons.idle += wagonRestPayload.value;
                        }
                        break;

                    case ResourceType.WOOD:
                        if (retValue.work.wagons.alloc.wood) {
                            retValue.work.wagons.alloc.wood -= wagonRestPayload.value;
                            retValue.work.wagons.idle += wagonRestPayload.value;
                        }
                        break;

                    case ResourceType.GOLD:
                        if (retValue.work.wagons.alloc.gold) {
                            retValue.work.wagons.alloc.gold -= wagonRestPayload.value;
                            retValue.work.wagons.idle += wagonRestPayload.value;
                        }
                        break;

                    case ResourceType.STONE:
                        if (retValue.work.wagons.alloc.stone) {
                            retValue.work.wagons.alloc.stone -= wagonRestPayload.value;
                            retValue.work.wagons.idle += wagonRestPayload.value;
                        }
                        break;
                }
                break;
        }

        return retValue;
    }

    timeUpdate(game: Game): Game {
        let retValue: Game = game;
        let timeMultiplier = 1;
        let timeSinceLastSave = Date.now() - game.lastSaveTimestamp;

        if (Date.now() - game.lastSaveTimestamp > 1000) {
            let calculatedTimeMultiplier = Math.round(timeSinceLastSave / 60);

            if (calculatedTimeMultiplier > 0) {
                timeMultiplier = calculatedTimeMultiplier;
            }
        }

        // CALCULATES RESOURCE FACTORS

        let factorFood = (0.01 + (retValue.work.villagers.alloc.food * 0.01) + (retValue.work.wagons.alloc.food * 0.05))
        let factorWood = (0.01 + (retValue.work.villagers.alloc.wood * 0.01) + (retValue.work.wagons.alloc.wood * 0.05))
        let factorGold = (0.01 + (retValue.work.villagers.alloc.gold * 0.01) + (retValue.work.wagons.alloc.gold * 0.05))
        let factorStone = (0.01 + (retValue.work.villagers.alloc.stone * 0.01) + (retValue.work.wagons.alloc.stone * 0.05))

        // EXECUTE CHANGES

        retValue.resources.food += factorFood * timeMultiplier;
        retValue.resources.wood += factorWood * timeMultiplier;
        retValue.resources.gold += factorGold * timeMultiplier;
        retValue.resources.stone += factorStone * timeMultiplier;

        return retValue;
    }
}