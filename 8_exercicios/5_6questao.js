"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modelos_1 = require("./modelos");
var banco_1 = require("./banco");
var banco = new banco_1.Banco();
banco.inserir(new modelos_1.Conta("111-1", 25, new modelos_1.Cliente(1, "Joao")));
banco.inserir(new modelos_1.Conta("111-2", 150, new modelos_1.Cliente(2, "Larissa")));
try {
    //Tentativa de transferir valor maior que o saldo
    banco.transferir("111-1", "111-2", 75);
}
catch (error) {
    console.error("Erro capturado:", error.message); //Saldo insuficiente.
}
//5. De certa forma, todas as implementações de transferir utilizam o método sacar da classe Conta, que por sua vez utiliza
//a exceção de Saldo Insuficiente. Essa exceção foi capturada e propagada para o método Conta.transferir(), e então para 
//o método Banco.transferir(), até chegar ao ponto de origem no script principal.
//6.
try {
    //Tentativa de criar conta com saldo inicial 0
    banco.inserir(new modelos_1.Conta("111-3", 0, new modelos_1.Cliente(3, "Meir")));
}
catch (error) {
    console.error("Erro capturado:", error.message); //Valor inválido: 0.
}
var conta = new modelos_1.Conta("111-3", 100, new modelos_1.Cliente(3, "Meir"));
try {
    //Tentativa de sacar valor < 0
    conta.sacar(-50);
}
catch (error) {
    console.error("Erro capturado:", error.message); //Valor inválido: -50.
}
try {
    //Tentativa de depositar valor < 0
    conta.sacar(-150);
}
catch (error) {
    console.error("Erro capturado:", error.message); //Valor inválido: -150.
}
