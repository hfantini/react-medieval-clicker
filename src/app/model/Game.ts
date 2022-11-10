import { Resources } from "./Resources";

class Game
{
    public _lastSaveTimestamp: number;
    public _resources: Resources = new Resources();

    public constructor()
    {
        this._resources = new Resources();
    }

    public get lastSaveTimestamp(): number
    {
        return this._lastSaveTimestamp;
    }

    public set lastSabeTimestamp(lastSabeTimestamp: number)
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