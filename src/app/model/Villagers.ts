import { Resources } from "./Resources";

class Villagers {
    idle: number;
    alloc: Resources;

    constructor(obj: any) {
        this.idle = obj?.idle | 0;
        this.alloc = new Resources(obj?.alloc);
    }
}

export { Villagers };
