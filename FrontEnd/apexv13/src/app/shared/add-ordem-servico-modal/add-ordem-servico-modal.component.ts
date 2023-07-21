import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-ordem-servico-modal',
  templateUrl: './add-ordem-servico-modal.component.html',
  styleUrls: ['./add-ordem-servico-modal.component.scss']
})
export class AddOrdemServicoModalComponent implements OnInit {

  @Input() oficina: any;
  confirmResult: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
  }

}
