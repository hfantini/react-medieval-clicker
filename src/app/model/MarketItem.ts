import { MarketPrice } from "./MarketPrice";

class MarketItem {
    name: string;
    desc: string;
    icon: any;
    price: Array<MarketPrice>;

    constructor(obj: any) {
        this.name = obj?.name;
        this.desc = obj?.desc;
        this.icon = obj?.icon;
        this.price = obj?.price;
    }
}

export { MarketItem };
