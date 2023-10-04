import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalService } from '../services/alert-modal.service';
import { ClientesService } from 'app/clientes/clientes.service';

@Component({
  selector: 'app-add-new-servico-modal',
  templateUrl: './add-new-servico-modal.component.html',
  styleUrls: ['./add-new-servico-modal.component.scss']
})
export class AddNewServicoModalComponent implements OnInit {
  @Input() oficina: any;
  confirmResult: Subject<boolean>;
  tipo: string;
  clienteId: any;
  formVeiculo: FormGroup;
  formCliente: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private alertService: AlertModalService,
    private clienteService: ClientesService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
