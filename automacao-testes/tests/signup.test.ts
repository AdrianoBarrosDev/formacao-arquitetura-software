import { expect, test } from "vitest";

test("Deve criar uma conta", async () => {
    const input = {
        name: "John Doe",
        email: "teste@gmail.com",
        document: "50829622055",
        password: "Teste1234"
    }
    const responseSignup = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const outputSignup = await responseSignup.json();
    expect(outputSignup.accountId).toBeDefined();

    const repsonseGetAccount = await fetch(`http://localhost:3000/accounts/${outputSignup.accountId}`);
    const outputGetAccount = await repsonseGetAccount.json();
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.document).toBe(input.document);
    expect(outputGetAccount.password).toBe(input.password);

});

test("Não deve criar uma conta com nome inválido", async () => {
    const input = {
        name: "John",
        email: "teste@gmail.com",
        document: "50829622055",
        password: "Teste1234"
    }
    const responseSignup = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const outputSignup = await responseSignup.json();
    expect(outputSignup.accountId).toBeUndefined();
});

test("Não deve criar uma conta com email inválido", async () => {
    const input = {
        name: "John Doe",
        email: "teste",
        document: "50829622055",
        password: "Teste1234"
    }
    const responseSignup = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const outputSignup = await responseSignup.json();
    expect(outputSignup.accountId).toBeUndefined();
});

test("Não deve criar uma conta com CPF inválido", async () => {
    const input = {
        name: "John Doe",
        email: "teste@gmail.com",
        document: "123teste",
        password: "Teste1234"
    }
    const responseSignup = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const outputSignup = await responseSignup.json();
    expect(outputSignup.accountId).toBeUndefined();
});

test("Não deve criar uma conta com senha inválida", async () => {
    const input = {
        name: "John Doe",
        email: "teste@gmail.com",
        document: "50829622055",
        password: "teste"
    }
    const responseSignup = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(input)
    });
    const outputSignup = await responseSignup.json();
    expect(outputSignup.accountId).toBeUndefined();
});