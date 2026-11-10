import API from "./api";
import { AccountDao } from "./dao/AccountDao";
import { AccountServiceImpl } from "./services/AccountService";

const accountDao = new AccountDao();
const accountService = new AccountServiceImpl(accountDao);
const api = new API(accountService);
