import express, { type Request, type Response } from "express";
import type AccountService from "./services/AccountService.ts";

export default class API {
    accountService: AccountService;

    constructor (accountService: AccountService) {
        this.accountService = accountService;

        const app = express();
        app.use(express.json());

        app.post("/signup", async (req: Request, res: Response) => {
            const input = req.body;
            try {
                const output = await accountService.createAccount(input);
                res.json({
                    accountId: output.accountId
                });
            } catch (e: any) {
                res.json({
                    error: e.message
                });
            }
        });

        app.get("/accounts/:accountId", async (req: Request, res: Response) => {
            const accountId = req.params.accountId as string;
            const accountData = await accountService.findAccount(accountId);
            res.json(accountData);
        });

        app.listen(3000);
    }

}