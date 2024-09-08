//1. Tratamento de erros mais comuns:
//     - Desconsiderar operação;
//     - Exibir mensagem de erro;
//     - Retornar um código de erro;
var Conta = /** @class */ (function () {
    function Conta(numero, saldo) {
        this._numero = numero;
        this._saldo = saldo;
    }
    //Exemplos:
    Conta.prototype.sacar1 = function (valor) {
        //Desconsiderando operação:
        if (this._saldo >= valor) {
            this._saldo = this._saldo - valor;
        }
        //Exibindo mensagem de erro:
        else {
            console.log('\nSaldo insuficiente.');
        }
    };
    Conta.prototype.sacar2 = function (valor) {
        if ((this._saldo - valor) < 0) {
            //Retornando código de erro:
            return false;
        }
        else {
            this._saldo = this._saldo - valor;
            return true;
        }
    };
    return Conta;
}());
var conta = new Conta("111-1", 50);
conta.sacar1(100);
console.log(conta.sacar2(100));
