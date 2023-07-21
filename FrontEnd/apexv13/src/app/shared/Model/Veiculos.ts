import { Identity } from "../crud/Identity";

export class Veiculos implements Identity {
  constructor(
    public id: number = 0,
    public marcaVeiculo: string = "",
    public placaVeiculo: string = "",
    public corVeiculo: string = "",
    public anoVeiculo: string = "",
    public modeloVeiculo: string = "",
    public kmVeiculo: string = ""
  ) {}

  toJSON(): Object {
    return {
      id: this.id,
      marcaVeiculo: this.marcaVeiculo,
      placaVeiculo: this.placaVeiculo,
      corVeiculo: this.corVeiculo,
      anoVeiculo: this.anoVeiculo,
      modeloVeiculo: this.modeloVeiculo,
      kmVeiculo: this.kmVeiculo,
    };
  }
}
