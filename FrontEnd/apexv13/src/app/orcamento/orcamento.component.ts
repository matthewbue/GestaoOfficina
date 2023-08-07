import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrdemdeServicoService } from 'app/ordemdeservico/ordemdeservico.service';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterOs } from 'app/shared/Model/filterOs';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { AlertModalService } from 'app/shared/services/alert-modal.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {

  constructor(private alertService: AlertModalService,
    private osService: OrdemdeServicoService,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,


    
    ) { }
 
  clientes = new Clientes();
  data: FilterOsDto[];
  formSearchOs: FormGroup;
  statusSelected: string;
  currentPage: number = 1;
  totalPages: number;
  itemsPerPage: number;
  tipoDoc: any;

  ngOnInit(): void {
    const requestData = new FilterOs("", "", 0, null, 1, 10)
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data;
      this.totalPages = response.totalPagina
      
      console.log(this.data);
      this.cdRef.detectChanges();
    });

    this.formSearchOs = this.fb.group({
      ordemNumero: null,
      nomeCliente: null,
      statusOs: null,      
    })

  }

  addOS(){
    const result$ = this.alertService.addOSModal(this.clientes);
  }

}
