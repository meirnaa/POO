//1. Tratamento de erros mais comuns:
//     - Desconsiderar operação;
//     - Exibir mensagem de erro;
//     - Retornar um código de erro;

class Continha {
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

let conta: Continha = new Continha("111-1", 50);
conta.sacar1(100);
console.log(conta.sacar2(100));

//2. Limitações de uso:

//     - Desconsiderar operação: gera incerteza quanto ao sucesso ou não da operação.
//     - Exibir mensagem de erro: limita a resposta à interface texto; Se o usuário estivesse
//     em uma aplicação WEB, por exemplo, a mensagem passaria despercebida, pois ele não iria olhar o prompt/console.
//     - Retornar um código de erro: ter que reservar valores para representar erros (no caso de utlizar retorno de números)
//     causa grande confusão caso uma função utilize esses números com outros propósitos. Além disso, tipar a função como
//     boolean também pode atrapalhar caso precise de outro tipo de retorno.