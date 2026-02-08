
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
  tipoDoc: string;
  
  // Novos campos do fluxo de orçamento
  statusOrcamento?: number; // StatusOrcamentoEnum
  statusOrcamentoDescricao?: string; // Para exibição amigável
  diagnosticoMecanico?: string;
  dataDiagnostico?: string;
  dataCheckIn?: string;
  dataOrcamentoCriado?: string;
  mecanicoId?: number;
  operadorCheckInId?: number;
  operadorOrcamentoId?: number;
  quantidadeFotos?: number; // Para indicar se tem fotos
  nomeCliente?: string; // Nome do cliente
  veiculo?: string; // Modelo do veículo
  placa?: string; // Placa do veículo
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
