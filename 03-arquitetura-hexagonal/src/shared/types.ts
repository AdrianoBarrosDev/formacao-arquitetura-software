export type SignupInput = {
    name: string,
    email: string,
    password: string,
    document: string
}

export type SignupOutput = {
    accountId: string
}

export type GetAccountOutput = {
    accountId: string,
    name: string,
    email: string,
    document: string,
    password: string
}

export type ValidateSignupResponse = {
    isValid: boolean,
    error: string
}

export type Account = {
    accountId: string;
    name: string;
    email: string;
    document: string;
    password: string;
}