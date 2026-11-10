import pgp from "pg-promise";
import crypto from "crypto";
import type { Account } from "../shared/types.ts"

const connection = pgp()("postgres://postgres:1234@localhost:5432/trading");

export class AccountDao {

    constructor() {

    }

    async createAccount(account: Account): Promise<String> {
        const INSERT_ACCOUNT_QUERY = "insert into account(account_id, name, email, document, password) values ($1, $2, $3, $4, $5);";
        const accountId = crypto.randomUUID();
        await connection.query(INSERT_ACCOUNT_QUERY,
            [accountId, account.name, account.email, account.document, account.password]
        );
        return accountId;
    }

    async findAccount(accountId: string): Promise<Account | null> {
        const FIND_ACCOUNT_QUERY = "select * from account where account_id = $1";
        const response = await connection.query(FIND_ACCOUNT_QUERY, [accountId]);
        if(response.length === 0) return null;
        const row = response[0];
        const accountResponse: Account = {
            accountId: row.account_id,
            name: row.name,
            email: row.email,
            document: row.document,
            password: row.password,
        }
        console.log(accountResponse.accountId);
        return accountResponse;
    }

}