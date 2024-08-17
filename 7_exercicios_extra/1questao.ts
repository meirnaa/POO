class Empregado {
    salario: number = 500;

    constructor (salario: number){
        this.salario = salario;
    }

    //1.a)
    calcularSalario(): number {
        return this.salario;
    }
}

class Diarista extends Empregado {
    constructor (salario: number){
        super(salario);
    }

    //1.b)
    calcularSalario(): number {
        return (super.calcularSalario()) / 30;
    }
}

class Horista extends Diarista {
    constructor (salario: number){
        super(salario);
    }

    //1.c)
    calcularSalario(): number {
        return (super.calcularSalario()) / 24;
    }
}

//6. testes:
let empregado: Empregado = new Empregado(1500);
console.log("Empregado: R$" + empregado.calcularSalario().toFixed(2));

let diarista: Empregado = new Diarista(1500);
console.log("Diarista: R$" + diarista.calcularSalario().toFixed(2));

let horista: Empregado  = new Horista(1500);
console.log("Horista: R$" + horista.calcularSalario().toFixed(2));
