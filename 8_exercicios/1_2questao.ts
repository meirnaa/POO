//1. Tratamento de erros mais comuns:
//     - Desconsiderar operação;
//     - Exibir mensagem de erro;
//     - Retornar um código de erro;

class Conta {
    private _numero: string;
    private _saldo: number;

    constructor(numero: string, saldo: number) {
        this._numero = numero;
        this._saldo = saldo;
    }

    //Exemplos:
    sacar1(valor: number) {
        //Desconsiderando operação:
        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
        }
        //Exibindo mensagem de erro:
        else{
            console.log('\nSaldo insuficiente.');
        }
    }

    sacar2(valor: number): boolean{
        if((this._saldo - valor) < 0){
            //Retornando código de erro:
            return false;
        }
        else{
            this._saldo = this._saldo - valor;
            return true;
        }
    }
}

let conta: Conta = new Conta("111-1", 50);
conta.sacar1(100);
console.log(conta.sacar2(100));