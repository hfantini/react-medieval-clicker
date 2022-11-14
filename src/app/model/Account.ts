import { Game } from "./Game";

class Account
{
    private _name: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _game: Game;

    public constructor(obj:any)
    {
        this._name = obj?._name;
        this._lastName = obj?._lastName;
        this._email = obj?._email;
        this._password = obj?._password;
        this._game = new Game(obj?._game);
    }

    public get name(): string
    {
        return this._name
    }

    public set name(name: string) 
    {
        this._name = name;
    }

    public get lastName(): string
    {
        return this._lastName
    }

    public set lastName(lastName: string) 
    {
        this._lastName = lastName;
    }

    public get email(): string
    {
        return this._email;
    }

    public set email(email: string) 
    {
        this._email = email;
    }

    public get password(): string
    {
        return this._password;
    }

    public set password(password: string) 
    {
        this._password = password;
    }

    public get game(): Game
    {
        return this._game;
    }

    public set game(game: Game) 
    {
        this._game = game;
    }    
}

export {Account}