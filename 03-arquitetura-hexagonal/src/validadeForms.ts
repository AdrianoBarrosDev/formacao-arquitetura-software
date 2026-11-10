import { validateCpf } from "./validateCpf.ts";
import type { SignupInput, ValidateSignupResponse } from "./shared/types.ts"

function validateName(name: string) {
    return name.match(/[a-zA-Z]+ [a-zA-Z]+/);
}

function validateEmail(email: string) {
    return email.match(/.+@.+\..+/);
}

function validatePassword(password: string) {
    return !(password.length < 8 || !password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[0-9]/));
}

export function validateSignup(signupRequest: SignupInput): ValidateSignupResponse {
    const validateSignupResponse: ValidateSignupResponse = {isValid: true, error: ""};
    if(!validateName(signupRequest.name)) {
        validateSignupResponse.isValid = false;
        validateSignupResponse.error = "Invalid name";
    }
    if(!validateEmail(signupRequest.email)) {
        validateSignupResponse.isValid = false;
        validateSignupResponse.error = "Invalid email";
    }
    if(!validateCpf(signupRequest.document)) {
        validateSignupResponse.isValid = false;
        validateSignupResponse.error = "Invalid CPF";
    }
    if(!validatePassword(signupRequest.password)) {
        validateSignupResponse.isValid = false;
        validateSignupResponse.error = "Invalid password";
    }
    return validateSignupResponse;
}
