import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {



  constructor() { }

  changePasswordFormSubmitted: boolean = false;

  changePasswordForm = new UntypedFormGroup({
    password: new UntypedFormControl('', [Validators.required]),
    confirm: new UntypedFormControl('', [Validators.required]),
  });

  onSubmit() {
    
  }

  get cf() {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
  }

}
