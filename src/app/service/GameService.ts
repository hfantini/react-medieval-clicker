import AccountService from "./AccountService";

export default class GameService
{
    newGame():GameProgress 
    {
        return {
            resources: 
            {
                food:25,
                wood:25,
                gold:25,
                stone:25
            }
        }
    }
}