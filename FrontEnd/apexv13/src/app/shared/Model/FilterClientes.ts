export class FilterClientes {
  constructor(
    public nomeCliente: string = "",
    public cpf: string = "",
    public placa: string = "",
    public pageNumber: number = 0,
    public pageSize: number = 0,
  ) {}
}
