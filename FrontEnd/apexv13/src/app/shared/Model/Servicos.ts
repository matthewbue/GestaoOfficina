import { Identity } from "../crud/Identity";

export class Servicos implements Identity {
  constructor(
    public id: number = 0,
    public descricao: string,

  ) { }

  toJSON(): Object {
    return {
      id: this.id,
      descricao: this.descricao
    };
  }
}
