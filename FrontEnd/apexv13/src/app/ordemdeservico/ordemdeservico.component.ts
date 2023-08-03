import { HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Clientes } from 'app/shared/Model/Clientes';
import { FilterOs } from 'app/shared/Model/filterOs';
import { AlertModalService } from 'app/shared/services/alert-modal.service';
import { OrdemdeServicoService } from './ordemdeservico.service';
import { FilterOsDto } from 'app/shared/Model/filterOsDto';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ordemdeservico',
  templateUrl: './ordemdeservico.component.html',
  styleUrls: ['./ordemdeservico.component.scss']
})
export class OrdemdeservicoComponent implements OnInit {

  constructor(private alertService: AlertModalService,
    private osService: OrdemdeServicoService,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) { }

  clientes = new Clientes();
  data: FilterOsDto[];
  formSearchOs: FormGroup;
  statusSelected: string

  ngOnInit(): void {
    const requestData = new FilterOs("", "", 0, null, 1, 10)
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; 
      console.log(this.data);
      this.cdRef.detectChanges();
    });

this.formSearchOs = this.fb.group({
  ordemNumero: null,
  nomeCliente: null,  
})

  }

  addOS() {
    const result$ = this.alertService.addOSModal(this.clientes);
  }

  onSelectStatus(event: any){
  this.statusSelected = event
  console.log('Marca selecionada:', this.statusSelected);

  }
  searchOs(){
    
    const ordemNumero = this.formSearchOs.value.ordemNumero  == null ? 0 : this.formSearchOs.value.ordemNumero;
    const nomeCliente = this.formSearchOs.value.nomeCliente  == null ? "" : this.formSearchOs.value.nomeCliente;

    const requestData = new FilterOs("", nomeCliente, ordemNumero, null, 1, 10)
    this.osService.getFilterOS(requestData).subscribe((response) => {
      this.data = response.data; // Armazene os objetos retornados no array
      console.log(this.data);
    });
  }

}
