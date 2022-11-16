import { Resources } from "./Resources";
import { Work } from "./Work";

class Game {
    private _lastSaveTimestamp: number;
    private _resources: Resources;
    private _work: Work;

    public constructor(obj: any) {
        this._lastSaveTimestamp = obj?._lastSaveTimestamp;
        this._resources = new Resources(obj?._resources);
        this._work = new Work(obj?._work);
    }

    public get lastSaveTimestamp(): number {
        return this._lastSaveTimestamp;
    }

    public set lastSaveTimestamp(lastSabeTimestamp: number) {
        this._lastSaveTimestamp = lastSabeTimestamp;
    }

    public get resources(): Resources {
        return this._resources;
    }

    public set resources(resources: Resources) {
        this._resources = resources;
    }

    public get work(): Work {
        return this._work;
    }

    public set work(work: Work) {
        this._work = work;
    }
}

export { Game };
