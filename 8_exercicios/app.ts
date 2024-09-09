import { readFileSync, writeFileSync } from 'fs';
import { Banco } from './banco';
import { Cliente, Conta, Poupanca, ContaImposto } from './modelos';
import { AplicacaoError } from './excecoes';

const promptSync = require('prompt-sync');
class AppBanco {
    private _banco: Banco;
    private _idCliente = 0;
    private CAMINHO_ARQUIVO = './contas.txt'
    private _input: any; 

    constructor() {
        this._banco = new Banco();
        this._input = promptSync(); 
    }

    menu() {

        let op: string = "";
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
                    this.executarOrdemDePagamento();
                    break;
                case "10":
                    this.listarContas();
                    break;
                }
            }catch (e) {
                if (e instanceof AplicacaoError) {
                    console.log(e.message); // "Ocorreu um erro na aplicação!"
                } else {
                    console.log("Erro desconhecido. Contate o administrador", e);
                }
                this.imprimirPressionarEnter();
            }
            

        } while (op != "0");
        
        console.log("Aplicação Encerrada");
    }



    private listarOpcoes() {
        console.log('\nBem vindo\nDigite uma opção:');
        console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
            '4 - Depositar       5 - Excluir               6 - Transferir\n' +
            '7 - Render Juros    8 - Totalizações          9 - Ordem de pagamento\n' +
            '10 - Listar contas  0 - Sair\n');
    }

    private cadastrar() {
        console.log("\nCadastrar conta\n");
        
        let numero: string = this._input('Digite o número da conta: ');
        let nomeCliente = this._input('Digite o nome do cliente: ');
        let opcaoConta = this._input('Informe o tipo: 1 - Conta 2 - Poupança 3 - Conta Imposto :')
        let cliente: Cliente = new Cliente(this._idCliente++, nomeCliente)
        let conta: Conta;

        if (opcaoConta == "2") {
            conta = new Poupanca(numero, 0, cliente, 0.5);
        } else if (opcaoConta == "3") {
            conta = new ContaImposto(numero, 0, cliente, 0.38);
        } else {
            conta = new Conta(numero, 0, cliente);
        }

        this._banco.inserir(conta);
        this.exibirConta(numero);
    }

    private exibirConta(numero: string, solicitarEnter: boolean = true) {
        let conta: Conta = this._banco.consultar(numero);
        console.log(`Número: ${conta.numero} - Cliente: ${conta.cliente.nome} - Saldo: R$ ${conta.saldo.toFixed(2)} `);
        
        if (solicitarEnter) {
            this.imprimirPressionarEnter();
        }
    }

    private imprimirPressionarEnter() {
        this._input("Pressione <enter>");
    }
    private consultarSaldo() {
        console.log("\nConsultar Saldo\n");
        let numero: string = this._input('Digite o número da conta: ');
        this.exibirConta(numero);
    }

    private sacar() {
        console.log("\nSacar\n");
        let numero: string = this._input('Digite o número da conta: ');
        let valor: number = parseFloat(this._input('Digite o valor do saque: '));
        this._banco.sacar(numero, valor);

        this.exibirConta(numero);
    }

    private depositar() {
        console.log("\nDepositar\n");
        let numero: string = this._input('Digite o número da conta: ');
        let valor: number = parseFloat(this._input('Digite o valor do depósito: '));
        this._banco.depositar(numero, valor);

        this.exibirConta(numero);
    }

    private renderJuros() {
        console.log("\Render juros\n");        
        let numero: string = this._input('Digite o número da poupança: ');
        this._banco.renderJuros(numero)
        
        this.exibirConta(numero);
    }

    private excluir() {
        throw new Error('Method not implemented.');
    }
    private transferir() {
        console.log("\Transferir\n");
        let numeroOrigem: string = this._input('Digite o número da conta de origem: ');
        let numeroDestino: string = this._input('Digite o número da conta de destino: ');
        let valor: number = parseFloat(this._input('Digite o valor do depósito: '));
        this._banco.transferir(numeroOrigem, numeroDestino, valor);
        this.exibirConta(numeroOrigem, false);
        this.exibirConta(numeroDestino);
    }

    private executarOrdemDePagamento() {
        console.log("\Ordem bancária\n");

        let numeroOrigem: string = this._input('Digite o número da conta de origem: ');
        let numeroDestino1 = this._input('Digite o número da conta de destino 1: ');
        let numeroDestino2: string = this._input('Digite o número da conta de destino 2: ');
        let numeroDestino3: string = this._input('Digite o número da conta de destino 3: ');
        let valor: number = parseFloat(this._input('Digite o valor do depósito: '));
        this._banco.executarOrdemDePagamento(numeroOrigem, valor, ...numeroDestino1, numeroDestino2, numeroDestino3);
        this.exibirConta(numeroOrigem, false);
        this.exibirConta(numeroDestino1, false);
        this.exibirConta(numeroDestino2, false);
        this.exibirConta(numeroDestino3);
    }
    private totalizacoes() {
        console.log("\nListar totalizações:\n");
        console.log(`Total de contas: ${this._banco.obterQuantidadeDeContas()}`);
        console.log(`Total de saldos: R$ ${this._banco.obterTotalDeSaldos().toFixed(2)}`);
        console.log(`Total de saldos: R$ ${this._banco.obterMediaDeSaldos().toFixed(2)}`);
        this.imprimirPressionarEnter();
    }

    private listarContas() {
        console.log("\nListar contas\n");
        for (let conta of this._banco.contas) {
            console.log(`Número: ${conta.numero} - Cliente: ${conta.cliente.nome} - Saldo: R$ ${conta.saldo.toFixed(2)} - Tipo: ${this.retornarTipoConta(conta)}`);
        }
        
        this.imprimirPressionarEnter();
    }

    private retornarTipoConta(conta: Conta): string {
        return conta instanceof Poupanca ? "Poupança" : conta instanceof ContaImposto ? "Conta Imposto" : "Conta";
    }

    public carregarDeArquivo() {
        const arquivo: string = readFileSync(this.CAMINHO_ARQUIVO, 'utf-8');
        //const linhas: string[] = arquivo.split('\n');
        const linhas: string[] = arquivo.split('\r\n');
        console.log(linhas)
        console.log("Iniciando leitura de arquivo");

        for (let i: number = 0; i < linhas.length; i++) {
            let linhaConta: string[] = linhas[i].split(";");
            let conta!: Conta;
            let cliente!: Cliente;

            let tipo: string = linhaConta[0];

            if (tipo == 'C') {
                cliente = new Cliente(parseInt(linhaConta[3]), linhaConta[4]);
                conta = new Conta(linhaConta[1], parseFloat(linhaConta[2]), cliente);
            } else if (tipo == 'CP') {
                cliente = new Cliente(parseInt(linhaConta[4]), linhaConta[5]);
                conta = new Poupanca(linhaConta[1], parseFloat(linhaConta[2]), cliente, parseFloat(linhaConta[3]));

            } else if (tipo == 'CI') {
                cliente = new Cliente(parseInt(linhaConta[4]), linhaConta[5]);
                conta = new ContaImposto(linhaConta[1], parseFloat(linhaConta[2]), cliente, parseFloat(linhaConta[3]));
            }

            this._banco.inserir(conta);
            console.log(`Conta ${conta.numero} carregada`);
        }

        console.log("fim do arquivo")

    }

    public salvarEmArquivo() {
        console.log("Iniciando a gravação de contas em arquivo.")
        let stringContas: string = "";
        let linha: string = "";

        for (let conta of this._banco.contas) {

            // linha = `C;${conta.numero};${conta.saldo};${conta.cliente.id};${conta.cliente.nome}\r\n`;

            if (conta instanceof Poupanca) {
                linha = `CP;${conta.numero};${conta.saldo};${conta.taxaDeJuros};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            }
            else if ((conta instanceof ContaImposto)) {
                linha = `CI;${conta.numero};${conta.saldo};${conta.taxaDeDesconto};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            } else {
                linha = `C;${conta.numero};${conta.saldo};${conta.cliente.id};${conta.cliente.nome}\r\n`;
            }


            stringContas += linha;
        }
        //deleta os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia
        stringContas = stringContas.slice(0, stringContas.length - 2);

        writeFileSync(this.CAMINHO_ARQUIVO, stringContas, 'utf-8');
        console.log("Contas salvas em arquivo.")
    }

}

export { AppBanco }