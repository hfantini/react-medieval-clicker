import { Resources } from "./Resources";

class Game
{
    private _lastSaveTimestamp: number;
    private _resources: Resources;
    
    public constructor(obj:any)
    {
        this._lastSaveTimestamp = obj?._lastSaveTimestamp;
        this._resources = new Resources(obj?._resources);
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
}

export {Game};