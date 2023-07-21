import { id } from '@swimlane/ngx-datatable';
import { Identity } from "../crud/Identity";

export class SearchAgendamentos implements Identity {
  constructor(
    public id: number = 0,
    public cpF_CNPJ: string = "",
    public IdAgendamento: number = 0,
    public tipoServiço: string = "",
    public dataAgendamento: string = "",
    public statusAgendamento: string = ""

  ) {}

  toJSON(): Object {
    return {
      id: this.id,
      cpfcnpj: this.cpF_CNPJ,
      IdAgendamento: this.IdAgendamento,
      tipoServiço: this.tipoServiço,
      dataAgendamento: this.dataAgendamento,
      statusAgendamento: this.statusAgendamento
    };
  }
}
