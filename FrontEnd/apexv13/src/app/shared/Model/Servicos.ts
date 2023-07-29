import { Identity } from "../crud/Identity";

export class Servicos implements Identity {
  constructor(
    public id: number = 0,

  ) { }

  toJSON(): Object {
    return {
      id: this.id,
    };
  }
}
