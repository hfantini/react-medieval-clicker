class Resources
{
    private _food: number = 0;
    private _wood: number = 0;
    private _gold: number = 0;
    private _stone: number = 0;

    public constructor(obj:any)
    {
        this._food = obj?._food | 0;
        this._wood = obj?._wood | 0;
        this._gold = obj?._gold | 0;
        this._stone = obj?._stone | 0;
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