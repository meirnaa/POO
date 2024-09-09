import {Cliente, Conta} from './modelos'
import {Banco} from './banco'

let banco : Banco = new Banco();
banco.inserir(new Conta("111-1", 25, new Cliente(1, "Joao")));
banco.inserir(new Conta("111-2", 150, new Cliente(2, "Larissa")));

try{
    //Tentativa de transferir para conta inexistente
    banco.transferir("111-1", "111-5", 75);
}catch(error){
    console.error("Erro capturado:", error.message);  //Conta não encontrada
}