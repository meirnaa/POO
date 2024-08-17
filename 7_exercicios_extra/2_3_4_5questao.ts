class Pessoa {
    //2.a)
    private _nome: string;
    private _sobrenome: string;

    //2.c)
    constructor(nome: string, sobrenome: string){
        this._nome = nome;
        this._sobrenome = sobrenome;
    }

    get nome(): string {
        return this._nome;
    }

    get sobrenome(): string {
        return this._sobrenome;
    }
    
    //2.b)
    get nomeCompleto(): string{
        return `${this._nome} ${this._sobrenome}`;
    }
}

class Funcionario extends Pessoa {
    //3.a)
    private _matricula: string;
    private _salario: number;

    constructor(nome: string, sobrenome: string, matricula: string, salario: number){
        super(nome, sobrenome);
        this._matricula = matricula;
        this._salario = salario;
    }

    get matricula(): string {
        return this._matricula;
    }

    get salario(): number {
        return this._salario;
    }

    //3.b)
    verificarSalario(): boolean {
        return this._salario > 0;
    }

    calcularSalarioPrimeiraParcela(): number {
        const salario = this.verificarSalario();

        if(salario){
            return 0.6 * this._salario;
        }
        
        console.log(`Salário não pode ser negativo.`);
        return 0;
    } 

    calcularSalarioSegundaParcela(): number {
        const salario = this.verificarSalario();

        if(salario){
            return 0.4 * this._salario;
        }
        
        console.log(`Salário não pode ser negativo.`);
        return 0;
    } 
}

class Professor extends Funcionario {
    //4.a)
    private _titulacao: string;

    constructor(nome: string, sobrenome: string, matricula: string, salario: number, titulacao: string){
        super(nome, sobrenome, matricula, salario);
        this._titulacao = titulacao;
    }

    get titulacao(): string {
        return this._titulacao;
    }

    //4.b)
    calcularSalarioPrimeiraParcela(): number {
        return this.salario;
    }

    calcularSalarioSegundaParcela(): number {
        return 0;
    }
}

class FolhaDePagamento {
    //5.
    pessoas: Pessoa[];

    constructor(pessoas: Pessoa[]){
        this.pessoas = pessoas;
    }

    calcularPagamentos(): number{
        let totalSalarios = 0;

        this.pessoas.forEach(pessoa => {
            if(pessoa instanceof Funcionario || pessoa instanceof Professor){
                totalSalarios += (pessoa as Funcionario | Professor).salario;
            }
        });

        return totalSalarios;
    }
}

//6. testes:
let pessoa1: Pessoa = new Professor("Maria", "Sousa", "123", 1600, "Professora Adjunta");
let pessoa2: Pessoa = new Funcionario("José", "Ferreira", "124", 1200);
let pessoa3: Pessoa = new Funcionario("Luisa", "Vieira", "125", 1250);
let pessoa4: Pessoa = new Professor("Leo", "Pereira", "126", 3750, "Professor Doutor");

console.log("Pessoa 1: ");
console.log(`${pessoa1.nomeCompleto} - R$ ${(pessoa1 as Professor).salario} - ${(pessoa1 as Professor).titulacao}`);
console.log("\nP1 - R$ " + (pessoa1 as Professor).calcularSalarioPrimeiraParcela().toFixed(2)); //R$1600
console.log("P2 - R$ " + (pessoa1 as Professor).calcularSalarioSegundaParcela().toFixed(2)); //R$0

console.log("\n\nPessoa 2: ");
console.log(`${pessoa2.nomeCompleto} - R$ ${(pessoa2 as Professor).salario}`);
console.log("\nP1 - R$ " + (pessoa2 as Funcionario).calcularSalarioPrimeiraParcela().toFixed(2)); //R$720
console.log("P2 - R$ " + (pessoa2 as Funcionario).calcularSalarioSegundaParcela().toFixed(2)); //R$480

let folhaDePagamento: FolhaDePagamento = new FolhaDePagamento([pessoa1, pessoa2, pessoa3, pessoa4]);
console.log("\nTotal de Pagamentos da folha -> R$ " + folhaDePagamento.calcularPagamentos().toFixed(2)); //R$7800
