export type SignupRequest = {
    name: string,
    email: string,
    password: string,
    cpf: string
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