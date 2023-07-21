import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject } from "rxjs";
import { AlertModalService } from "../services/alert-modal.service";

@Component({
  selector: "app-add-ordem-servico-modal",
  templateUrl: "./add-ordem-servico-modal.component.html",
  styleUrls: ["./add-ordem-servico-modal.component.scss"],
})
export class AddOrdemServicoModalComponent implements OnInit {
  @Input() oficina: any;
  confirmResult: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private alertService: AlertModalService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  goTo() {
    this.router.navigate(["clientes/new"]);
    this.modalService.hide();
  }
}
