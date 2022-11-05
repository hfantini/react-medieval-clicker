import IRepository from "../interface/IRepository";
import { Account } from "../types/Account";

export default class AccountRepository implements IRepository<Account> {

    load(id: any): Promise<Account>
    {
        return new Promise( (resolve) => {
            let retValue:Account = null;

            if(typeof id == "string" && window.localStorage.getItem(id) != null) {
                retValue = JSON.parse(window.localStorage.getItem(id));
            }

            resolve(retValue);
        })
    }

    save(value: Account): Promise<Account> 
    {
        return new Promise( (resolve) => {
            window.localStorage.setItem(value.email, JSON.stringify(value));
            resolve(value);
        });
    }

    exists(id: any): boolean {
        return window.localStorage.getItem(id) != null;
    }
}