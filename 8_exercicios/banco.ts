import { ContaNaoEncontradaError, PoupancaInvalidaError } from './excecoes';
import {Cliente, Conta, Poupanca, ContaImposto} from './modelos';

class Banco {
    private _contas: Conta[] = [];

    inserir(conta: Conta) {
        this._contas.push(conta);
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }

        if (contaProcurada == null) {
            throw new ContaNaoEncontradaError('Conta não encontrada: ' + numero);
        }
        return contaProcurada;
    }

    alterar(conta: Conta, novaConta: Conta) {
        let contaProcurada: Conta = this.consultar(conta.numero);
        contaProcurada.sacar(contaProcurada.saldo);
        contaProcurada.depositar(novaConta.saldo);

        contaProcurada.cliente = novaConta.cliente;
    }

    //9.
    alterarPorIndice(conta: Conta, novaConta: Conta) {
        let indice: number = this.consultarPorIndice(conta.numero);
        this._contas[indice].sacar(this._contas[indice].saldo);
        this._contas[indice].depositar(novaConta.saldo);
    }

    private consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;
        for (let i: number = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        if (indiceProcurado == -1) {
            throw new ContaNaoEncontradaError('Conta não encontrada: ' + numero);
        }

        return indiceProcurado;
    }

    //9.
    excluir(numero: string): void {
        let indice: number = this.consultarPorIndice(numero);
        for (let i: number = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
            console.log(this._contas);
        }

        this._contas.pop();
    }

    //9.
    sacar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        conta.sacar(valor);
    }

    //9.
    depositar(numero: string, valor: number): void {
        let conta: Conta = this.consultar(numero);
        conta.depositar(valor);
    }

    transferir(numero: string, numeroContaDestino: string, valor: number): void {
        let contaOrigem: Conta = this.consultar(numero);
        let contaDestino: Conta = this.consultar(numeroContaDestino);

        contaOrigem.transferir(contaDestino, valor);
        
    }

    obterQuantidadeDeContas(): number {
        return this._contas.length;
    }

    obterTotalDeSaldos(): number {
        let total: number = 0;
        for (let conta of this._contas) {
            total += conta.saldo;
        }

        return total;
    }
    
    obterMediaDeSaldos(): number {
        return this.obterTotalDeSaldos() / this.obterQuantidadeDeContas();
    }
    
    executarOrdemDePagamento(numeroContaOrigem: string, valor: number, ...numerosContasDestino: string[]) {
        
        let contaOrigem: Conta = this.consultar(numeroContaOrigem);
        contaOrigem.validarValor(valor);
        let todasContasDestinoExistem: boolean = true;
        let contasDestino: Conta[] = [];
       
        for (let numeroContaDestino of numerosContasDestino) {
            let contaDestino: Conta = this.consultar(numeroContaDestino);
            
            contasDestino.push(contaDestino);

        }
        todasContasDestinoExistem = todasContasDestinoExistem && contaOrigem != null;
                
        let numeroDeContasDestino = (numerosContasDestino.length);
        if (contaOrigem.saldo >= valor * numeroDeContasDestino && todasContasDestinoExistem) {
            contaOrigem.sacar(valor * numeroDeContasDestino);
            for(let contaDestino of contasDestino){
                contaDestino.depositar(valor);
            }
        }
    }

    consultarSaldo(numero: string): number {
        let conta: Conta = this.consultar(numero);
        return conta.saldo;
    }

    renderJuros(numero: string): void {
        let conta: Conta = this.consultar(numero);

        //12.
        if (!(conta instanceof Poupanca)) {
            throw new PoupancaInvalidaError('Conta não é uma poupança: ' + numero); 
        }

        conta.renderJuros();
    }

    get contas(): Conta[] {
      return this._contas;
    }
}

export {Banco};