import { ResourceType } from "../../enum/ResourceType"

type IncrementResourcesPayload =
{
    resource:ResourceType,
    value:number
}

export {IncrementResourcesPayload}