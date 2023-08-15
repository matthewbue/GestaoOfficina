export class FilterOs {
    constructor(        
        public placa: string = "",
        public nomeCliente: string = "",
        public numeroOS: number = 0,
        public dataAberturaOS: Date,
        public pageNumber: number = 0,
        public pageSize: number = 0,
        public dataInicio: Date,
        public dataFim: Date,


    ) { }

}
