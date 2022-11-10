import IRepository from "../interface/IRepository";
import { Account } from "../model/Account";

export default class AccountRepository implements IRepository<Account> {

    getById(id: string): Promise<Account> 
    {
        return new Promise( (resolve, reject) => {
            try
            {
                let retValue:Account = null;

                if(typeof id == "string" && window.localStorage.getItem(id) != null) 
                {
                    retValue = JSON.parse(window.localStorage.getItem(id));
                }

                resolve(retValue);
            }
            catch(e)
            {
                reject(e);
            }
        })
    }

    create(value: Account): Promise<Account>
    {
        return new Promise( (resolve, reject) => {
            try
            {
                if(!this.exists(value.email))
                {
                    window.localStorage.setItem(value.email, JSON.stringify(value));
                    resolve(value);
                }
                else
                {
                    reject("Account already exists.")
                }
            }
            catch(e) 
            {
                reject(e);
            }
        });
    }

    delete(value: Account): Promise<Account> {
        return new Promise( (resolve, reject) => 
        {
            if(this.exists(value.email))
            {
                window.localStorage.removeItem(value.email);
                resolve(value);
            }
            else
            {
                reject("Account does not exists.")
            }
        });
    }

    update(value: Account): Promise<Account> {
        return new Promise( (resolve, reject) => 
        {
            if(this.exists(value.email)) 
            {
                window.localStorage.setItem(value.email, JSON.stringify(value));
                resolve(value);
            }
            else
            {
                reject("Account does not exists.")
            }
        });
    }

    exists(id: string): boolean {
        return window.localStorage.getItem(id) != null;
    }
}