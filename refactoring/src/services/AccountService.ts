import type { Account } from "../shared/types.ts";
import { AccountDao } from "../dao/AccountDao.ts";

export class AccountService {
    accountDao: AccountDao;

    constructor() {
        this.accountDao = new AccountDao();
    }

    async createAccount(account: Account): Promise<String> {
        return this.accountDao.createAccount(account);
    }

    async findAccount(accountId: string): Promise<Account | null> {
        return this.accountDao.findAccount(accountId);
    }

}