import { Account } from "../model/Account";
import AccountRepository from "../repository/AccountRepository";

export default class AccountService
{
    private accountRepository:AccountRepository = null;

    constructor()
    {
        this.accountRepository = new AccountRepository();
    }

    load(email:string):Promise<Account>
    {
        return this.accountRepository.getById(email);
    }

    save(account:Account):Promise<Account>
    {
        if(this.accountRepository.exists(account.email))
        {
            return this.accountRepository.update(account);
        }
        else
        {
            return this.accountRepository.create(account);
        }       
    }

    exists(email:string)
    {
        return this.accountRepository.exists(email);
    }
    
    login(email:string, pass:string):Promise<Account>
    {
        return new Promise( (resolve, reject) =>
        {
            this.accountRepository.getById(email).then( (account:Account) =>
            {
                if(account != null) 
                {
                    if(account.password == pass)
                    {
                        this.setCurrentLoggedAccount(account);
                        resolve(account);
                    }
                    else
                    {
                        reject("Combination login and password is invalid")
                    }
                }
                else
                {
                    reject("Combination login and password is invalid")
                }
            }).catch( (e) =>
            {
                reject(`Failed at login operation: ${e}`)
            } )
        } )
    }

    private setCurrentLoggedAccount(account:Account):void {
        window.localStorage.setItem("currentAccount", account.email)
    }

    public getCurrentLoggedAccount():string {
        return window.localStorage.getItem("currentAccount");
    }
}