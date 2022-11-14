import { ResourceType } from "../enum/ResourceType";

class MarketPrice
{
    resource: ResourceType;
    value: number;

    constructor( obj:any )
    {
        this.resource = obj?.resource;
        this.value = obj?.value;
    }
}

export {MarketPrice}