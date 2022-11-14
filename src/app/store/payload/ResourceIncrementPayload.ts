import { ResourceType } from "../../enum/ResourceType"

type ResourceIncrementPayload =
{
    resource:ResourceType,
    value:number
}

export {ResourceIncrementPayload}