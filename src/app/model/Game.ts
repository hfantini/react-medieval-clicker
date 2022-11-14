import { Resources } from "./Resources";
import { Villagers } from "./Villagers";

class Game
{
    private _lastSaveTimestamp: number;
    private _resources: Resources;
    private _villagers: Villagers;
    
    public constructor(obj:any)
    {
        this._lastSaveTimestamp = obj?._lastSaveTimestamp;
        this._resources = new Resources(obj?._resources);
        this._villagers = new Villagers(obj?._villagers);
    }

    public get lastSaveTimestamp(): number
    {
        return this._lastSaveTimestamp;
    }

    public set lastSaveTimestamp(lastSabeTimestamp: number)
    {
        this._lastSaveTimestamp = lastSabeTimestamp;
    }

    public get resources(): Resources
    {
        return this._resources;
    }

    public set resources(resources: Resources)
    {
        this._resources = resources;
    }

    public get villagers(): Villagers
    {
        return this._villagers;
    }    

    public set villagers(villagers: Villagers)
    {
        this._villagers = villagers;
    }    
}

export {Game};