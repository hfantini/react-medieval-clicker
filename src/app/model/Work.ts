import { Villagers } from "./Villagers";
import { Wagons } from "./Wagons";

class Work
{
    villagers: Villagers;
    wagons: Wagons;

    constructor( obj:any )
    {
        this.villagers = new Villagers(obj?.villagers)
        this.wagons = new Wagons(obj?.wagons);
    }
}

export { Work }