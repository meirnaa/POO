import { SaldoInsuficienteError, ValorInvalidoError } from "./excecoes";

class Cliente {
    id: number;
    nome: string;

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
    }
}

class Conta {
    numero: string;
    cliente: Cliente;
    private _saldo: number;

    constructor(numero: string, saldo: number, cliente: Cliente) {
        this.numero = numero;
        this.cliente = cliente;
        //10.
        // this.depositar(saldo); erro - Tenta acessar propriedades que ainda não foram inicializadas
        this._saldo = saldo;
    }

    sacar(valor: number) {

        if (this._saldo < valor) {
            throw new SaldoInsuficienteError(`Saldo insuficiente na conta ${this.numero}. Saldo atual: ${this._saldo}`);
        }
        
        this.validarValor(valor);
        
        this._saldo = this._saldo - valor;
    }

    //11.
    validarValor(valor: number): void {
        if (valor <= 0 || isNaN(valor)) {
            throw new ValorInvalidoError('Valor inválido: ' + valor);
        }  
    }

    depositar(valor: number): void {
        this.validarValor(valor);
        this._saldo = this._saldo + valor
    }

    get saldo(): number {
        return this._saldo;
    }

    /*
    consultarSaldo(): number {
        return this._saldo;
    }*/

    transferir(contaDestino: Conta, valor: number): void {
        /*
        this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;
        */
        this.sacar(valor);
        contaDestino.depositar(valor);

    }
}




class Poupanca extends Conta {
    private _taxaDeJuros: number

    constructor(numero: string, saldo: number, cliente: Cliente, taxaDeJuros: number) {

        super(numero, saldo, cliente);
        this._taxaDeJuros = taxaDeJuros;
    }

    get taxaDeJuros(): number {
        return this._taxaDeJuros;
    }
    
    public renderJuros() {
        let juros: number = this.saldo * this._taxaDeJuros / 100;
        this.depositar(juros);
    }
}

class ContaImposto extends Conta {
    private _taxaDeDesconto: number = 0;

    constructor(numero: string, saldo: number, cliente: Cliente, taxaImposto: number) {
        super(numero, saldo, cliente);
        this._taxaDeDesconto = taxaImposto;
    }

    sacar(valor: number): void {
        super.sacar(valor);
        let valorImposto = valor * this._taxaDeDesconto / 100;
        super.sacar(valorImposto)
    }

    get taxaDeDesconto(): number {
        return this._taxaDeDesconto;
    }

}

export { Cliente, Conta, Poupanca, ContaImposto };