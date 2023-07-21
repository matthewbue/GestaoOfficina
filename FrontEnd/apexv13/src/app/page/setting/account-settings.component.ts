import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'app/Account/account.service';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { User } from 'app/shared/Model/user';
import { FormValidationsService } from 'app/shared/services/form-validations.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss', './../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AcconutSettingsComponent extends BaseFormComponent implements OnInit {

  user: User = new User();

  constructor(public translate: TranslateService,
    public toastr: ToastrService,
    private formtranslate: FormValidationsService,
    private accountService: AccountService) {
    super();
    this.oform = new FormGroup({
      userName: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ]),

      fullname:
        new FormControl(
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
          ]
        ),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]
      ),
      newPassword: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),

        ],
      ),
      newPasswordConfirm: new FormControl(
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      )
    }, { validators: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("newPassword").value;
    let confirmPass = group.get("newPasswordConfirm").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get f() {
    return this.oform.controls;
  }

  submit() {
    this.submitted = true;
    // this.user.newPassword = this.oform.value.newPassword;
    // this.user.newPasswordConfirm = this.oform.value.newPasswordConfirm;
    this.user.password = this.oform.value.password;

    this.accountService.changePassword(this.user).subscribe(
      () => {
        this.submitted = false;
        this.toastr.success(
          this.formtranslate.getMsg("account.setting.message.CHANGEPASSWORDSUCCESS"));

      },
      (err) => {
        this.submitted = false;
        if (err.status === 403) {
          this.toastr.warning(
            this.formtranslate.getMsg("account.message.UNAUTHORIZE")
          );
        }
        else if (err.error.status === 400) {
          let msg = ""

          if (err.error.errors != null) {
            err.error.errors.Messages.forEach(element => {
              msg += `${this.formtranslate.getMsg("account.setting.message." + element.toUpperCase())}|`
            });
          }
          if (msg.length > 0) {
            this.toastr.warning(msg);
          }

          // if (err.error.errors.Messages.includes("RoleRequired") || err.error.errors.Messages.includes("FacilityRequired")) {
          //   this.toastr.warning(this.formtranslate.getMsg("account.message." + "RoleRequired".toUpperCase()));
          // }
        }
        else {

          this.toastr.error(err.error != null ? err.error.message : err);
        }

      }
    )

  }

  ngOnInit() {
    this.accountService.getUserAuthenticaded().subscribe((data) => {
      (this.user = data);
      //this.f["userFacilityIds"].setValue(this.user.userFacilityIds);
      //this.f["userRoleIds"].setValue(this.user.userRoleIds[0]);
      this.f["userName"].setValue(this.user.userName);
      this.f["fullname"].setValue(this.user.fullname);
      this.f["email"].setValue(this.user.email);

    });
  }




}
