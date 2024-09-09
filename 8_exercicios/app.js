"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppBanco = void 0;
var fs_1 = require("fs");
var banco_1 = require("./banco");
var modelos_1 = require("./modelos");
var excecoes_1 = require("./excecoes");
var promptSync = require('prompt-sync');
var AppBanco = /** @class */ (function () {
    function AppBanco() {
        this._idCliente = 0;
        this.CAMINHO_ARQUIVO = './contas.txt';
        this._banco = new banco_1.Banco();
        this._input = promptSync();
    }
    AppBanco.prototype.menu = function () {
        var op = "";
        do {
            this.listarOpcoes();
            //13.
            try {
                op = this._input('Digite uma opção: ');
                switch (op) {
                    case "1":
                        this.cadastrar();
                        break;
                    case "2":
                        this.consultarSaldo();
                        break;
                    case "3":
                        this.sacar();
                        break;
                    case "4":
                        this.depositar();
                        break;
                    case "5":
                        this.excluir();
                        break;
                    case "6":
                        this.transferir();
                        break;
                    case "7":
                        this.renderJuros();
                        break;
                    case "8":
                        this.totalizacoes();
                        break;
                    case "9":
                        this.OrdemDePagamento();
                        break;
                    case "10":
                        this.listarContas();
                        break;
                }
            }
            catch (e) {
                if (e instanceof excecoes_1.AplicacaoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                }
                else {
                    console.log("Erro desconhecido. Contate o administrador", e);
                }
                this.imprimirPressionarEnter();
            }
        } while (op != "0");
        console.log("Aplicação Encerrada");
    };
    AppBanco.prototype.listarOpcoes = function () {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
            '4 - Depositar       5 - Excluir               6 - Transferir\n' +
            '7 - Render Juros    8 - Totalizações          9 - Ordem de pagamento\n' +
            '10 - Listar contas  0 - Sair\n');
    };
    AppBanco.prototype.cadastrar = function () {
        console.log("\nCadastrar conta\n");
        var numero = this._input('Digite o número da conta: ');
        if (numero.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var nomeCliente = this._input('Digite o nome do cliente: ');
        if (nomeCliente.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O nome do cliente não pode ser vazio.");
        }
        var opcaoConta = this._input('Informe o tipo: 1 - Conta 2 - Poupança 3 - Conta Imposto: ');
        if (opcaoConta != "1" && opcaoConta != "2" && opcaoConta != "3") {
            throw new excecoes_1.ValorInvalidoError("Opção de conta inválida.");
        }
        var cliente = new modelos_1.Cliente(this._idCliente++, nomeCliente);
        var conta;
        if (opcaoConta == "2") {
            conta = new modelos_1.Poupanca(numero, 0, cliente, 0.5);
        }
        else if (opcaoConta == "3") {
            conta = new modelos_1.ContaImposto(numero, 0, cliente, 0.38);
        }
        else {
            conta = new modelos_1.Conta(numero, 0, cliente);
        }
        this._banco.inserir(conta);
        this.exibirConta(numero);
    };
    AppBanco.prototype.exibirConta = function (numero, solicitarEnter) {
        if (solicitarEnter === void 0) { solicitarEnter = true; }
        var conta = this._banco.consultar(numero);
        console.log("N\u00FAmero: ".concat(conta.numero, " - Cliente: ").concat(conta.cliente.nome, " - Saldo: R$ ").concat(conta.saldo.toFixed(2), " "));
        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    };
    AppBanco.prototype.imprimirPressionarEnter = function () {
        this._input("Pressione <enter>");
    };
    AppBanco.prototype.consultarSaldo = function () {
        console.log("\nConsultar Saldo\n");
        var numero = this._input('Digite o número da conta: ');
        this.exibirConta(numero);
    };
    AppBanco.prototype.sacar = function () {
        console.log("\nSacar\n");
        var numero = this._input('Digite o número da conta: ');
        if (numero.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var valor = parseFloat(this._input('Digite o valor do saque: '));
        if (isNaN(valor) || valor <= 0) {
            throw new excecoes_1.ValorInvalidoError("O valor do saque deve ser um número positivo.");
        }
        this._banco.sacar(numero, valor);
        this.exibirConta(numero);
    };
    AppBanco.prototype.depositar = function () {
        console.log("\nDepositar\n");
        var numero = this._input('Digite o número da conta: ');
        if (numero.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var valor = parseFloat(this._input('Digite o valor do depósito: '));
        if (isNaN(valor) || valor <= 0) {
            throw new excecoes_1.ValorInvalidoError("O valor do depósito deve ser um número positivo.");
        }
        this._banco.depositar(numero, valor);
        this.exibirConta(numero);
    };
    AppBanco.prototype.renderJuros = function () {
        console.log("\Render juros\n");
        var numero = this._input('Digite o número da poupança: ');
        if (numero.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        this._banco.renderJuros(numero);
        this.exibirConta(numero);
    };
    AppBanco.prototype.excluir = function () {
        console.log("\nExcluir conta\n");
        var numero = this._input('Digite o número da conta a ser excluída: ');
        try {
            var conta = this._banco.consultar(numero);
            this._banco.excluir(numero);
            console.log("Conta ".concat(numero, " exclu\u00EDda com sucesso."));
        }
        catch (e) {
            if (e instanceof excecoes_1.AplicacaoError) {
                console.log("Erro ao excluir conta: ".concat(e.message));
            }
            else {
                console.log("Erro desconhecido ao excluir a conta.");
            }
        }
        this.imprimirPressionarEnter();
    };
    AppBanco.prototype.transferir = function () {
        console.log("\Transferir\n");
        var numeroOrigem = this._input('Digite o número da conta de origem: ');
        if (numeroOrigem.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var numeroDestino = this._input('Digite o número da conta de destino: ');
        if (numeroDestino.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var valor = parseFloat(this._input('Digite o valor do depósito: '));
        if (isNaN(valor) || valor <= 0) {
            throw new excecoes_1.ValorInvalidoError("O valor do depósito deve ser um número positivo.");
        }
        this._banco.transferir(numeroOrigem, numeroDestino, valor);
        this.exibirConta(numeroOrigem, false);
        this.exibirConta(numeroDestino);
    };
    AppBanco.prototype.OrdemDePagamento = function () {
        console.log("\Ordem bancária\n");
        var numeroOrigem = this._input('Digite o número da conta de origem: ');
        if (numeroOrigem.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var numeroDestino1 = this._input('Digite o número da conta de destino 1: ');
        if (numeroDestino1.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var numeroDestino2 = this._input('Digite o número da conta de destino 2: ');
        if (numeroDestino2.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var numeroDestino3 = this._input('Digite o número da conta de destino 3: ');
        if (numeroDestino3.trim() === "") {
            throw new excecoes_1.ValorInvalidoError("O número da conta não pode ser vazio.");
        }
        var valor = parseFloat(this._input('Digite o valor do depósito: '));
        if (isNaN(valor) || valor <= 0) {
            throw new excecoes_1.ValorInvalidoError("O valor do depósito deve ser um número positivo.");
        }
        this.executarOrdemDePagamento(numeroOrigem, valor, numeroDestino1, numeroDestino2, numeroDestino3);
        this.exibirConta(numeroOrigem, false);
        this.exibirConta(numeroDestino1, false);
        this.exibirConta(numeroDestino2, false);
        this.exibirConta(numeroDestino3);
    };
    AppBanco.prototype.executarOrdemDePagamento = function (numeroOrigem, valor, numeroDestino1, numeroDestino2, numeroDestino3) {
        this._banco.transferir(numeroOrigem, numeroDestino1, valor);
        this._banco.transferir(numeroOrigem, numeroDestino2, valor);
        this._banco.transferir(numeroOrigem, numeroDestino3, valor);
    };
    AppBanco.prototype.totalizacoes = function () {
        console.log("\nListar totalizações:\n");
        console.log("Total de contas: ".concat(this._banco.obterQuantidadeDeContas()));
        console.log("Total de saldos: R$ ".concat(this._banco.obterTotalDeSaldos().toFixed(2)));
        console.log("Total de saldos: R$ ".concat(this._banco.obterMediaDeSaldos().toFixed(2)));
        this.imprimirPressionarEnter();
    };
    AppBanco.prototype.listarContas = function () {
        console.log("\nListar contas\n");
        for (var _i = 0, _a = this._banco.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            console.log("N\u00FAmero: ".concat(conta.numero, " - Cliente: ").concat(conta.cliente.nome, " - Saldo: R$ ").concat(conta.saldo.toFixed(2), " - Tipo: ").concat(this.retornarTipoConta(conta)));
        }
        this.imprimirPressionarEnter();
    };
    AppBanco.prototype.retornarTipoConta = function (conta) {
        return conta instanceof modelos_1.Poupanca ? "Poupança" : conta instanceof modelos_1.ContaImposto ? "Conta Imposto" : "Conta";
    };
    AppBanco.prototype.carregarDeArquivo = function () {
        var arquivo = (0, fs_1.readFileSync)(this.CAMINHO_ARQUIVO, 'utf-8');
        //const linhas: string[] = arquivo.split('\n');
        var linhas = arquivo.split('\r\n');
        console.log(linhas);
        console.log("Iniciando leitura de arquivo");
        for (var i = 0; i < linhas.length; i++) {
            var linhaConta = linhas[i].split(";");
            var conta = void 0;
            var cliente = void 0;
            var tipo = linhaConta[0];
            if (tipo == 'C') {
                cliente = new modelos_1.Cliente(parseInt(linhaConta[3]), linhaConta[4]);
                conta = new modelos_1.Conta(linhaConta[1], parseFloat(linhaConta[2]), cliente);
            }
            else if (tipo == 'CP') {
                cliente = new modelos_1.Cliente(parseInt(linhaConta[4]), linhaConta[5]);
                conta = new modelos_1.Poupanca(linhaConta[1], parseFloat(linhaConta[2]), cliente, parseFloat(linhaConta[3]));
            }
            else if (tipo == 'CI') {
                cliente = new modelos_1.Cliente(parseInt(linhaConta[4]), linhaConta[5]);
                conta = new modelos_1.ContaImposto(linhaConta[1], parseFloat(linhaConta[2]), cliente, parseFloat(linhaConta[3]));
            }
            this._banco.inserir(conta);
            console.log("Conta ".concat(conta.numero, " carregada"));
        }
        console.log("fim do arquivo");
    };
    AppBanco.prototype.salvarEmArquivo = function () {
        console.log("Iniciando a gravação de contas em arquivo.");
        var stringContas = "";
        var linha = "";
        for (var _i = 0, _a = this._banco.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            // linha = `C;${conta.numero};${conta.saldo};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            if (conta instanceof modelos_1.Poupanca) {
                linha = "CP;".concat(conta.numero, ";").concat(conta.saldo, ";").concat(conta.taxaDeJuros, ";").concat(conta.cliente.id, ";").concat(conta.cliente.nome, "\r\n");
            }
            else if ((conta instanceof modelos_1.ContaImposto)) {
                linha = "CI;".concat(conta.numero, ";").concat(conta.saldo, ";").concat(conta.taxaDeDesconto, ";").concat(conta.cliente.id, ";").concat(conta.cliente.nome, "\r\n");
            }
            else {
                linha = "C;".concat(conta.numero, ";").concat(conta.saldo, ";").concat(conta.cliente.id, ";").concat(conta.cliente.nome, "\r\n");
            }
            stringContas += linha;
        }
        //deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
        stringContas = stringContas.slice(0, stringContas.length - 2);
        (0, fs_1.writeFileSync)(this.CAMINHO_ARQUIVO, stringContas, 'utf-8');
        console.log("Contas salvas em arquivo.");
    };
    return AppBanco;
}());
exports.AppBanco = AppBanco;
