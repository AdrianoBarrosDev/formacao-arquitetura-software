import crypto from "crypto"
import { validateSignup } from "../validadeForms";
import type { Account, GetAccountOutput, SignupInput, SignupOutput } from "../shared/types";

// Driver port
export default interface AccountService {
    createAccount (input: SignupInput): Promise<SignupOutput>;
    findAccount (accountId: string): Promise<GetAccountOutput>;
}

// Driven port
export interface AccountServiceAccountData {
    createAccount (input: Account): Promise<string>;
    findAccount (accountId: string): Promise<GetAccountOutput>;
}

export class AccountServiceImpl implements AccountService {
    accountData: AccountServiceAccountData;

    constructor(accountData: AccountServiceAccountData) {
        this.accountData = accountData;
    }

    async createAccount(input: SignupInput): Promise<SignupOutput> {
        const validateSignupOutput = validateSignup(input);
        if(!validateSignupOutput.isValid) throw new Error(validateSignupOutput.error);
        const account = {
            accountId: crypto.randomUUID(),
            name: input.name,
            email: input.email,
            document: input.document,
            password: input.password
        }
        await this.accountData.createAccount(account);
        return {
            accountId: account.accountId
        };
    }

    async findAccount(accountId: string): Promise<GetAccountOutput> {
        return this.accountData.findAccount(accountId);
    }

}