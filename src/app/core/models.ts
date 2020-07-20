export class Categoria {
  codigo: number;
}

export class Endereco {
  logradouro: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
}

export class Lancamento {
  codigo: number;
  tipoLancamento = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}

export class User {
  codigo: number;
  nome: string;
}


