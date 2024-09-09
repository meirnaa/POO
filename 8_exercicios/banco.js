"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
var excecoes_1 = require("./excecoes");
var modelos_1 = require("./modelos");
var Banco = /** @class */ (function () {
    function Banco() {
        this._contas = [];
    }
    Banco.prototype.inserir = function (conta) {
        this._contas.push(conta);
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                contaProcurada = this._contas[i];
                break;
            }
        }
        if (contaProcurada == null) {
            throw new excecoes_1.ContaNaoEncontradaError('Conta não encontrada: ' + numero);
        }
        return contaProcurada;
    };
    Banco.prototype.alterar = function (conta, novaConta) {
        var contaProcurada = this.consultar(conta.numero);
        contaProcurada.sacar(contaProcurada.saldo);
        contaProcurada.depositar(novaConta.saldo);
        contaProcurada.cliente = novaConta.cliente;
    };
    //9.
    Banco.prototype.alterarPorIndice = function (conta, novaConta) {
        var indice = this.consultarPorIndice(conta.numero);
        this._contas[indice].sacar(this._contas[indice].saldo);
        this._contas[indice].depositar(novaConta.saldo);
    };
    Banco.prototype.consultarPorIndice = function (numero) {
        var indiceProcurado = -1;
        for (var i = 0; i < this._contas.length; i++) {
            if (this._contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }
        if (indiceProcurado == -1) {
            throw new excecoes_1.ContaNaoEncontradaError('Conta não encontrada: ' + numero);
        }
        return indiceProcurado;
    };
    //9.
    Banco.prototype.excluir = function (numero) {
        var indice = this.consultarPorIndice(numero);
        for (var i = indice; i < this._contas.length; i++) {
            this._contas[i] = this._contas[i + 1];
            console.log(this._contas);
        }
        this._contas.pop();
        console.log(this._contas);
    };
    //9.
    Banco.prototype.sacar = function (numero, valor) {
        var conta = this.consultar(numero);
        conta.sacar(valor);
    };
    //9.
    Banco.prototype.depositar = function (numero, valor) {
        var conta = this.consultar(numero);
        conta.depositar(valor);
    };
    Banco.prototype.transferir = function (numero, numeroContaDestino, valor) {
        var contaOrigem = this.consultar(numero);
        var contaDestino = this.consultar(numeroContaDestino);
        contaOrigem.transferir(contaDestino, valor);
    };
    Banco.prototype.obterQuantidadeDeContas = function () {
        return this._contas.length;
    };
    Banco.prototype.obterTotalDeSaldos = function () {
        var total = 0;
        for (var _i = 0, _a = this._contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            total += conta.saldo;
        }
        return total;
    };
    Banco.prototype.obterMediaDeSaldos = function () {
        return this.obterTotalDeSaldos() / this.obterQuantidadeDeContas();
    };
    Banco.prototype.executarOrdemDePagamento = function (numeroContaOrigem, valor) {
        var numerosContasDestino = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            numerosContasDestino[_i - 2] = arguments[_i];
        }
        var contaOrigem = this.consultar(numeroContaOrigem);
        contaOrigem.validarValor(valor);
        var todasContasDestinoExistem = true;
        var contasDestino = [];
        for (var _a = 0, numerosContasDestino_1 = numerosContasDestino; _a < numerosContasDestino_1.length; _a++) {
            var numeroContaDestino = numerosContasDestino_1[_a];
            var contaDestino = this.consultar(numeroContaDestino);
            contasDestino.push(contaDestino);
        }
        todasContasDestinoExistem = todasContasDestinoExistem && contaOrigem != null;
        var numeroDeContasDestino = (numerosContasDestino.length);
        if (contaOrigem.saldo >= valor * numeroDeContasDestino && todasContasDestinoExistem) {
            contaOrigem.sacar(valor * numeroDeContasDestino);
            for (var _b = 0, contasDestino_1 = contasDestino; _b < contasDestino_1.length; _b++) {
                var contaDestino = contasDestino_1[_b];
                contaDestino.depositar(valor);
            }
        }
    };
    Banco.prototype.consultarSaldo = function (numero) {
        var conta = this.consultar(numero);
        return conta.saldo;
    };
    Banco.prototype.renderJuros = function (numero) {
        var conta = this.consultar(numero);
        //12.
        if (!(conta instanceof modelos_1.Poupanca)) {
            throw new excecoes_1.PoupancaInvalidaError('Conta não é uma poupança: ' + numero);
        }
        conta.renderJuros();
    };
    Object.defineProperty(Banco.prototype, "contas", {
        get: function () {
            return this._contas;
        },
        enumerable: false,
        configurable: true
    });
    return Banco;
}());
exports.Banco = Banco;
