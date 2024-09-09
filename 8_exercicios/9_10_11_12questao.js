"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const banco_1 = require("./banco");
const modelos_1 = require("./modelos");
//9.
let banco = new banco_1.Banco();
let conta1 = new modelos_1.Poupanca("111-1", 250, new modelos_1.Cliente(1, "Maria"), 2);
let conta2 = new modelos_1.ContaImposto("111-2", 1, new modelos_1.Cliente(2, "Julia"), 2);
banco.inserir(conta1);
banco.inserir(conta2);
console.log(`Saldo inicial da conta ${conta1.numero}: ${banco.consultarSaldo("111-1")}`);
let novaConta = new modelos_1.Conta("111-3", 300, new modelos_1.Cliente(3, "Kleber"));
banco.alterar(conta1, novaConta);
console.log(`Saldo da conta ${conta1.numero} apos alteracao 1: ${conta1.saldo}`);
banco.alterarPorIndice(conta1, new modelos_1.Poupanca("111-1", 250, new modelos_1.Cliente(1, "Maria"), 2));
console.log(`Saldo da conta ${conta1.numero} apos alteracao 2: ${conta1.saldo}`);
conta1.sacar(100);
console.log(`Saldo da conta ${conta1.numero} apos saque: ${conta1.saldo}`);
conta1.depositar(5);
console.log(`Saldo da conta ${conta1.numero} apos deposito: ${conta1.saldo}`);
conta1.transferir(conta2, 100);
console.log(`Saldo da conta ${conta1.numero} apos realizar transferencia: ${conta1.saldo}`); //55
console.log(`Saldo da conta ${conta2.numero} apos receber transferencia: ${conta2.saldo}`); //60
banco.renderJuros("111-1");
console.log(`Saldo da conta ${conta1.numero} apos render juros: ${conta1.saldo}`);
//10. Error: Valor inválido: NaN (Ao alterar o construtor para fazer um saque do valor inicial)
// Tenta acessar propriedades que ainda não foram inicializadas
//11.
try {
    //Tentativa de sacar valor negativo
    conta1.sacar(-1);
}
catch (error) {
    console.error("Erro capturado:", error.message); //Valor inválido: -1.
}
try {
    //Tentativa de depositar valor invalido
    conta1.depositar(0);
}
catch (error) {
    console.error("Erro capturado:", error.message); //Valor inválido: 0.
}
//12.
try {
    //Tentativa de render juros em conta imposto
    banco.renderJuros("111-2");
}
catch (error) {
    console.error("Erro capturado:", error.message); //Erro: Conta não é uma poupança: 111-2
}
