import { Component, OnInit, Injectable } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

//@Component({
//  selector: 'app-base-form',
//  template: '<div></div>'
//})
@Injectable({ providedIn: "root" })

export abstract class BaseFormComponent implements OnInit {

  oform: FormGroup;
  rows = [];
  rowsFilter = [];
  temp = [];
  title: string;
  submitted: boolean;

  constructor() {}

  ngOnInit() {}

  abstract submit();

  onSubmit() {
    if (this.oform.valid) {
      this.submit();
    } else {
      this.verificaValidacoesForm(this.oform);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const controle = formGroup.get(field);
      controle.markAsDirty();
      controle.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  reset() {
    this.oform.reset();
  }

  verificaValidTouched(field: string) {
    return (
      !this.oform.get(field).valid &&
      (this.oform.get(field).touched || this.oform.get(field).dirty)
    );
  }

  verificaRequired(field: string) {
    return (
      this.oform.get(field).hasError("required") &&
      (this.oform.get(field).touched || this.oform.get(field).dirty)
    );
  }

  verificaEmailInvalido() {
    const campoEmail = this.oform.get("email");
    if (campoEmail.errors) {
      return campoEmail.errors["email"] && campoEmail.touched;
    }
  }

  aplicaCssErro(field: string) {
    return {
      "has-error": this.verificaValidTouched(field),
      "has-feedback": this.verificaValidTouched(field),
    };
  }
}
