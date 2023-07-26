import { Identity } from "../crud/Identity";
import { Automovel } from "./Automovel";

export class Clientes implements Identity {
  forEach() {
    throw new Error("Method not implemented.");
  }
  constructor(
    public id: number = 0,
    public nome: string = "", // Renomeie a propriedade para "nome"
    public cpf: string = "",
    public dataNascimento: Date = new Date(),
    public endereco: string = "",
    public bairro: string = "",
    public cidade: string = "",
    public uf: string = "",
    public numeroWhatsapp: string = "",
    public numeroContato: string = "", // Renomeie a propriedade para "numeroContato"
    public email: string = "",
    public automoveis: Automovel[] = [] // Inicializa a lista de automóveis vazia
  ) {}

  toJSON(): Object {
    return {
      id: this.id,
      nome: this.nome,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
      endereco: this.endereco,
      bairro: this.bairro,
      cidade: this.cidade,
      uf: this.uf,
      numeroWhatsapp: this.numeroWhatsapp,
      numeroContato: this.numeroContato,
      email: this.email,
      automoveis: this.automoveis
    };
  }
}
