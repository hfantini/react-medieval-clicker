import { Game } from "./Game";

class Account
{
    private _name: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _game: Game;

    public constructor
    (
        name: string = null, 
        lastname: string = null, 
        email: string = null,
        password: string = null,
        game: Game = null
    )
    {
        this._name = name;
        this._lastName = lastname;
        this._email = email;
        this._password = password;
        this._game = game;

        if(this._game == null)
        {
            this._game = new Game();
        }
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