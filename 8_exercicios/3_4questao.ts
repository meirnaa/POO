import { Conta, Cliente } from './modelos';

//3.
let conta: Conta = new Conta("111-1", 50, new Cliente(1, "Joaozinho"));

try{
    //Tentativa de sacar valor maior que o saldo
    conta.sacar(100);
}catch(error){
    console.error("Erro capturado:", error.message);  //Saldo insuficiente.
}

//4. 
let conta1: Conta = new Conta("111-2", 50, new Cliente(2, "Pedro"));
let conta2: Conta = new Conta("111-3", 50, new Cliente(3, "Larissa"));

try{
    //Tentativa de transferir valor maior que o saldo
    conta1.transferir(conta2, 100);
}catch(error){
    console.error("Erro capturado:", error.message);  //Saldo insuficiente.
}

// Lança o mesmo erro do exemplo da 3° questão já que transferir utiliza o método sacar para retirar o valor a ser repassado da conta de origem.