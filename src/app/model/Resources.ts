class Resources
{
    public _food: number = 0;
    public _wood: number = 0;
    public _gold: number = 0;
    public _stone: number = 0;

    public constructor(
        food: number = 0, 
        wood: number = 0, 
        gold: number = 0, 
        stone: number = 0
    )
    {
        this._food = food;
        this._wood = wood;
        this._gold = gold;
        this._stone = stone;
    }

    public get food(): number
    {
        return this._food;
    }

    public set food(value:number)
    {
        this._food = value;
    }

    public get wood(): number
    {
        return this._wood;
    }

    public set wood(value:number)
    {
        this._wood = value;
    }    

    public get gold(): number
    {
        return this._gold;
    }

    public set gold(value:number)
    {
        this._gold = value;
    }
    
    public get stone(): number
    {
        return this._stone;
    }

    public set stone(value:number)
    {
        this._wood = value;
    }            
}

export {Resources}