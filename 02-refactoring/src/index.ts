import express, { type Request, type Response } from "express";

import type { ValidateSignupResponse, Account } from "./shared/types.ts"
import { validateSignup } from "./validadeForms.ts";
import { AccountService } from "./services/AccountService.ts";

const app = express();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
    const signupRequest: Account = {
        accountId: "",
        name: req.body.name, 
        email: req.body.email, 
        document: req.body.document, 
        password: req.body.password
    };

    const responseValidadeSignup: ValidateSignupResponse = validateSignup(signupRequest);
    if(!responseValidadeSignup.isValid) {
        return res.json({
            error: responseValidadeSignup.error
        });
    }

    let accountService = new AccountService();
    var accountId = await accountService.createAccount(signupRequest);
    
    res.json({
        accountId
    });
});

app.get("/accounts/:accountId", async (req: Request, res: Response) => {
    const accountId: string = String(req.params.accountId);
    let accountService = new AccountService();
    const accountData: Account | null = await accountService.findAccount(accountId);
    res.json(accountData);
});

app.listen(3000);