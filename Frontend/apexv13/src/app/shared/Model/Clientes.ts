import { Identity } from "../crud/Identity";
import { Veiculos } from "./Veiculos";

export class Clientes implements Identity {
  forEach() {
    throw new Error("Method not implemented.");
  }
  constructor(
    public id: number = 0,
    public veiculos: Veiculos[] = [],
    public nomeCliente: string | null = null,
    public cpfCliente: string | null = null,
    public dataNascimento: string | null = null,
    public endereco: string = "",
    public bairro: string = "",
    public cidade: string = "",
    public uf: string = "",
    public numeroWhatsapp: string = "",
    public telefoneContato: string = "",
    public email: string = ""
  ) {}

  toJSON(): Object {
    return {
      id: this.id,
      nomeCliente: this.nomeCliente,
      cpfCliente: this.cpfCliente,
      dataNascimento: this.dataNascimento,
      endereco: this.endereco,
      bairro: this.bairro,
      cidade: this.cidade,
      uf: this.uf,
      numeroWhatsapp: this.numeroWhatsapp,
      telefoneContato: this.telefoneContato,
      email: this.email,
    };
  }
}
