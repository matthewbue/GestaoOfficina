import { Identity } from "../crud/Identity";
import { Veiculos } from "./Veiculos";

export class Clientes implements Identity {
  forEach() {
    throw new Error("Method not implemented.");
  }
  constructor(
    public id: number = 0,
    public bairro: string = "",
    public cidade: string = "",
    public dataNascimento: Date = new Date(),
    public endereco: string = "",
    public uf: string = "",
    public nome: string = "",
    public numeroWhatsapp: string = "",
    public email: string = "",
    public numeroContato: string = "",
    public cpf: string = "",
    public automoveis: Veiculos[] = [],
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
    };
  }
}
