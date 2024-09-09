"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modelos_1 = require("./modelos");
const banco_1 = require("./banco");
let banco = new banco_1.Banco();
banco.inserir(new modelos_1.Conta("111-1", 25, new modelos_1.Cliente(1, "Joao")));
banco.inserir(new modelos_1.Conta("111-2", 150, new modelos_1.Cliente(2, "Larissa")));
try {
    //Tentativa de transferir para conta inexistente
    banco.transferir("111-1", "111-5", 75);
}
catch (error) {
    console.error("Erro capturado:", error.message); //Conta não encontrada
}
