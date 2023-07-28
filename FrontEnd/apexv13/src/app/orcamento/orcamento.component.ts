import { Component, OnInit } from '@angular/core';
import { Clientes } from 'app/shared/Model/Clientes';
import { AlertModalService } from 'app/shared/services/alert-modal.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {

  constructor(private alertService: AlertModalService,) { }
  clientes = new Clientes();

  ngOnInit(): void {
  }

  addOS(){
    const result$ = this.alertService.addOSModal(this.clientes);
  }

}
