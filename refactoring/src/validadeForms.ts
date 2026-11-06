import { validateCpf } from "./validateCpf.ts";
import type { Account, ValidateSignupResponse } from "./shared/types.ts"

function validateName(name: string) {
    return name.match(/[a-zA-Z]+ [a-zA-Z]+/);
}

function validateEmail(email: string) {
    return email.match(/.+@.+\..+/);
}

function validatePassword(password: string) {
    return !(password.length < 8 || !password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[0-9]/));
}

export function validateSignup(signupRequest: Account): ValidateSignupResponse {
    const ValidateSignupResponse: ValidateSignupResponse = {isValid: true, error: ""};
    if(!validateName(signupRequest.name)) {
        ValidateSignupResponse.isValid = false;
        ValidateSignupResponse.error = "Invalid name";
    }
    if(!validateEmail(signupRequest.email)) {
        ValidateSignupResponse.isValid = false;
        ValidateSignupResponse.error = "Invalid email";
    }
    if(!validateCpf(signupRequest.document)) {
        ValidateSignupResponse.isValid = false;
        ValidateSignupResponse.error = "Invalid CPF";
    }
    if(!validatePassword(signupRequest.password)) {
        ValidateSignupResponse.isValid = false;
        ValidateSignupResponse.error = "Invalid password";
    }
    return ValidateSignupResponse;
}
