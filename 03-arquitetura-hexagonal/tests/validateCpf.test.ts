import { expect, test } from "vitest";
import { validateCpf } from "../src/validateCpf.ts";

test.each([
    ["508.296.220-55", "CPF válido com números e pontuação"],
    ["50829622055", "CPF válido com apenas números"],
    ["71428793860", "CPF válido com um digito igual a zero"],
    ["87748248800", "CPF válido com dois digitos igual a zero"]
])("Deve verificar um cpf válido: %s %s", (cpf: string, motivo: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeTruthy();
});

test.each([
    ["teste", "CPF inválido letras"],
    ["123teste", "CPF inválido letras e números"],
    ["123teste123", "CPF inválido letras e números com 11 digitos"],
    ["123456789101112", "CPF inválido com mais de 14 digitos"],
    ["123123", "CPF inválido com menos de 11 digitos"],
    ["11111111111", "CPF inválido com todos os digitos iguais"]
])("Deve verificar um cpf inválido: %s %s", (cpf: string, motivo: string) => {
    const isValid = validateCpf(cpf);
    expect(isValid).toBeFalsy();
});

