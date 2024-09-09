"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var banco_1 = require("./banco");
var modelos_1 = require("./modelos");
//9.
var banco = new banco_1.Banco();
var conta1 = new modelos_1.Poupanca("111-1", 250, new modelos_1.Cliente(1, "Maria"), 2);
var conta2 = new modelos_1.ContaImposto("111-2", 1, new modelos_1.Cliente(2, "Julia"), 2);
banco.inserir(conta1);
banco.inserir(conta2);
console.log("Saldo inicial da conta ".concat(conta1.numero, ": ").concat(banco.consultarSaldo("111-1")));
var novaConta = new modelos_1.Conta("111-3", 300, new modelos_1.Cliente(3, "Kleber"));
banco.alterar(conta1, novaConta);
console.log("Saldo da conta ".concat(conta1.numero, " apos alteracao 1: ").concat(conta1.saldo));
banco.alterarPorIndice(conta1, new modelos_1.Poupanca("111-1", 250, new modelos_1.Cliente(1, "Maria"), 2));
console.log("Saldo da conta ".concat(conta1.numero, " apos alteracao 2: ").concat(conta1.saldo));
conta1.sacar(100);
console.log("Saldo da conta ".concat(conta1.numero, " apos saque: ").concat(conta1.saldo));
conta1.depositar(5);
console.log("Saldo da conta ".concat(conta1.numero, " apos deposito: ").concat(conta1.saldo));
conta1.transferir(conta2, 100);
console.log("Saldo da conta ".concat(conta1.numero, " apos realizar transferencia: ").concat(conta1.saldo)); //55
console.log("Saldo da conta ".concat(conta2.numero, " apos receber transferencia: ").concat(conta2.saldo)); //60
banco.renderJuros("111-1");
console.log("Saldo da conta ".concat(conta1.numero, " apos render juros: ").concat(conta1.saldo));
//10. Error: Valor inválido: NaN (Ao alterar o construtor para fazer um saque do valor inicial)
// Tenta acessar propriedades que ainda não foram inicializadas
