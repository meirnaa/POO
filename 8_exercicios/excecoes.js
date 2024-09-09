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
exports.ValorInvalidoError = exports.ContaNaoEncontradaError = exports.SaldoInsuficienteError = exports.AplicacaoError = exports.PoupancaInvalidaError = void 0;
//7.
var AplicacaoError = /** @class */ (function (_super) {
    __extends(AplicacaoError, _super);
    function AplicacaoError(message) {
        return _super.call(this, message) || this;
    }
    return AplicacaoError;
}(Error));
exports.AplicacaoError = AplicacaoError;
var SaldoInsuficienteError = /** @class */ (function (_super) {
    __extends(SaldoInsuficienteError, _super);
    function SaldoInsuficienteError(message) {
        return _super.call(this, message) || this;
    }
    return SaldoInsuficienteError;
}(AplicacaoError));
exports.SaldoInsuficienteError = SaldoInsuficienteError;
var ContaNaoEncontradaError = /** @class */ (function (_super) {
    __extends(ContaNaoEncontradaError, _super);
    function ContaNaoEncontradaError(message) {
        return _super.call(this, message) || this;
    }
    return ContaNaoEncontradaError;
}(AplicacaoError));
exports.ContaNaoEncontradaError = ContaNaoEncontradaError;
var ValorInvalidoError = /** @class */ (function (_super) {
    __extends(ValorInvalidoError, _super);
    function ValorInvalidoError(message) {
        return _super.call(this, message) || this;
    }
    return ValorInvalidoError;
}(AplicacaoError));
exports.ValorInvalidoError = ValorInvalidoError;
//12.
var PoupancaInvalidaError = /** @class */ (function (_super) {
    __extends(PoupancaInvalidaError, _super);
    function PoupancaInvalidaError(message) {
        return _super.call(this, message) || this;
    }
    return PoupancaInvalidaError;
}(AplicacaoError));
exports.PoupancaInvalidaError = PoupancaInvalidaError;
