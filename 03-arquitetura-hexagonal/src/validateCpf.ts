const FIRST_CPF_DIGIT = 0;

export function validateCpf (cpf: string) {
    if(!cpf) return false;
    cpf = removeNonDigits(cpf);
    if(cpf.length !== 11 || areAllDigitsEquals(cpf)) return false;
    let checkDigit = extractCheckDigit(cpf);
    const verifiedDigit = `${calculateDigit(cpf, 10)}${calculateDigit(cpf, 11)}`;
    return checkDigit == verifiedDigit;
}

function removeNonDigits(cpf: string) {
    return cpf.replaceAll(/\D/g, "");
}

function areAllDigitsEquals(cpf: string) {
    return [...cpf].every((digit: string) => digit === cpf[FIRST_CPF_DIGIT])
}

function extractCheckDigit(cpf: string) {
    return cpf.slice(9);
}

function calculateDigit(cpf: string, weight: number) {
    let sum = 0;
    for(const digit of cpf) {
        if(weight < 2) break;
        sum += parseInt(digit) * weight--;
    }
    const remainder = sum%11;
    return (remainder < 2) ? 0 : 11 - remainder;
}