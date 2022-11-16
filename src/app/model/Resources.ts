class Resources {
    public food: number = 0;
    public wood: number = 0;
    public gold: number = 0;
    public stone: number = 0;

    public constructor(obj: any) {
        this.food = obj?.food | 0;
        this.wood = obj?.wood | 0;
        this.gold = obj?.gold | 0;
        this.stone = obj?.stone | 0;
    }
}

export { Resources };
