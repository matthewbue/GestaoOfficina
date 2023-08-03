
export class FilterOsDto {
  id: number;
  nome: string | null;
  kmatual: number;
  kmservico: number;
  valor: number;
  valorTotal: number;
  mediakm: number;
  observacoes: string;
  status: string;
  dataOS: string;
  idCarro: number;
  clientId: number;
  clients: Client;
}

export class Client {
    id: number;
    bairro: string;
    cidade: string;
    dataNascimento: string;
    endereco: string;
    uf: string;
    nome: string;
    numeroWhatsapp: string;
    email: string;
    numeroContato: string;
    cpf: string;
    automovelId: number;
    manutenceId: number | null;
  }
