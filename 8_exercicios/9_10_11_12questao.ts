import { Banco } from "./banco";
import { Cliente, Poupanca, ContaImposto, Conta } from "./modelos";

//9.
let banco = new Banco();
let conta1 = new Poupanca("111-1", 250, new Cliente(1, "Maria"), 2);
let conta2 = new ContaImposto("111-2", 1, new Cliente(2, "Julia"), 2);
banco.inserir(conta1);
banco.inserir(conta2);
console.log(`Saldo inicial da conta ${conta1.numero}: ${banco.consultarSaldo("111-1")}`);
let novaConta = new Conta("111-3", 300, new Cliente(3, "Kleber"));
banco.alterar(conta1, novaConta);
console.log(`Saldo da conta ${conta1.numero} apos alteracao 1: ${conta1.saldo}`);
banco.alterarPorIndice(conta1, new Poupanca("111-1", 250, new Cliente(1, "Maria"), 2));
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

//11