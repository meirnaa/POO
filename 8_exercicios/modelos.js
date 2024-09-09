"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaImposto = exports.Poupanca = exports.Conta = exports.Cliente = void 0;
var excecoes_1 = require("./excecoes");
var Cliente = /** @class */ (function () {
    function Cliente(id, nome) {
        this.id = id;
        this.nome = nome;
    }
    return Cliente;
}());
exports.Cliente = Cliente;
var Conta = /** @class */ (function () {
    function Conta(numero, saldo, cliente) {
        this.numero = numero;
        this.cliente = cliente;
        //10.
        // this.depositar(saldo); erro - Tenta acessar propriedades que ainda não foram inicializadas
        this._saldo = saldo;
    }
    Conta.prototype.sacar = function (valor) {
        if (this._saldo < valor) {
            throw new excecoes_1.SaldoInsuficienteError("Saldo insuficiente na conta ".concat(this.numero, ". Saldo atual: ").concat(this._saldo));
        }
        this.validarValor(valor);
        this._saldo = this._saldo - valor;
    };
    //11.
    Conta.prototype.validarValor = function (valor) {
        if (valor <= 0 || isNaN(valor)) {
            throw new excecoes_1.ValorInvalidoError('Valor inválido: ' + valor);
        }
    };
    Conta.prototype.depositar = function (valor) {
        this.validarValor(valor);
        this._saldo = this._saldo + valor;
    };
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        enumerable: false,
        configurable: true
    });
    /*
    consultarSaldo(): number {
        return this._saldo;
    }*/
    Conta.prototype.transferir = function (contaDestino, valor) {
        /*
        this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;
        */
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    return Conta;
}());
exports.Conta = Conta;
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, saldo, cliente, taxaDeJuros) {
        var _this = _super.call(this, numero, saldo, cliente) || this;
        _this._taxaDeJuros = taxaDeJuros;
        return _this;
    }
    Object.defineProperty(Poupanca.prototype, "taxaDeJuros", {
        get: function () {
            return this._taxaDeJuros;
        },
        enumerable: false,
        configurable: true
    });
    Poupanca.prototype.renderJuros = function () {
        var juros = this.saldo * this._taxaDeJuros / 100;
        this.depositar(juros);
    };
    return Poupanca;
}(Conta));
exports.Poupanca = Poupanca;
var ContaImposto = /** @class */ (function (_super) {
    __extends(ContaImposto, _super);
    function ContaImposto(numero, saldo, cliente, taxaImposto) {
        var _this = _super.call(this, numero, saldo, cliente) || this;
        _this._taxaDeDesconto = 0;
        _this._taxaDeDesconto = taxaImposto;
        return _this;
    }
    ContaImposto.prototype.sacar = function (valor) {
        _super.prototype.sacar.call(this, valor);
        var valorImposto = valor * this._taxaDeDesconto / 100;
        _super.prototype.sacar.call(this, valorImposto);
    };
    Object.defineProperty(ContaImposto.prototype, "taxaDeDesconto", {
        get: function () {
            return this._taxaDeDesconto;
        },
        enumerable: false,
        configurable: true
    });
    return ContaImposto;
}(Conta));
exports.ContaImposto = ContaImposto;
