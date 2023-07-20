import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidationsService } from './../services/form-validations.service';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;

  constructor( private validations: FormValidationsService ) { }

  ngOnInit() {
  }

  get errorMessage() {

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) &&
        (this.control.touched)) {
        return this.validations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
        }
    }

    return null;
  }

}
