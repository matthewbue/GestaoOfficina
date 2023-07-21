import { Location } from "@angular/common";
import { Component, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";

import { BsModalRef } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { ToastrService } from "ngx-toastr";
import { isThisQuarter } from "date-fns";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.scss"],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = "Cancelar";
  @Input() okTxt = "Sim";
  @Input() colorButtonOk = "btn btn-square btn-info";
  @Input() hasCpfInput = false;

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef, private router: Router, private auth: AuthService, private toastr: ToastrService) {}

  cpf: FormControl;
  cpfForm: FormGroup = new FormGroup({
    cpf: new FormControl()
  });

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.confirmAndClose(true);
    // window.history.back();
    window.addEventListener('popstate', function() {
      location.reload();
    });
  }

  // onConfirm() {
  //   this.confirmAndClose(true);
  //   window.history.back();
  // }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);

    this.bsModalRef.hide();
  }
}
