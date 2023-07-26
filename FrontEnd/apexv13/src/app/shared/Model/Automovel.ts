import { Identity } from "../crud/Identity";

export class Automovel implements Identity {
  constructor(
    public id: number = 0,
    public marca: string = "",
    public placa: string = "",
    public cor: string = "",
    public modelo: string = "",
    public ano: string = "",
    public km: string = "",
    public clienteId: number = 0
  ) {}

  toJSON(): Object {
    return {
      id: this.id,
      marca: this.marca,
      placa: this.placa,
      cor: this.cor,
      ano: this.ano,
      modelo: this.modelo,
      km: this.km,
      clienteId: this.clienteId
    };
  }
}
