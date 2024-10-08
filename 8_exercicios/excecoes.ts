//7.
class AplicacaoError extends Error {

    constructor(message: string) {
        super(message)
    }
}

class SaldoInsuficienteError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

class ContaNaoEncontradaError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

//14.
class ValorInvalidoError extends AplicacaoError {
  constructor(message: string) {
    super(message);
  }
}

//12.
class PoupancaInvalidaError extends AplicacaoError {
    constructor(message: string) {
      super(message);
    }
}

export {PoupancaInvalidaError, AplicacaoError, SaldoInsuficienteError, ContaNaoEncontradaError, ValorInvalidoError };