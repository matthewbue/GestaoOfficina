import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {



  constructor() { }

  changePasswordFormSubmitted: boolean = false;

  changePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    
  }

  get cf() {
    return this.changePasswordForm.controls;
  }

  ngOnInit(): void {
  }

}
