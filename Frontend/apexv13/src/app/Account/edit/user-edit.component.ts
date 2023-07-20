import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { FormValidationsService } from 'app/shared/services/form-validations.service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';
import { Role } from 'app/shared/Model/role';
import { Observable } from 'rxjs';
import { User } from './../../shared/Model/user';
import { UpperCasePipe } from '@angular/common';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';

@Component({
  selector: 'app-users-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss',
    '../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent extends BaseFormComponent implements OnInit {


  roles$: Observable<Role[]>;
  user: User = new User();;
  selectedFacilityIds: number[];

  constructor(public translate: TranslateService,
    public toastr: ToastrService,
    private formtranslate: FormValidationsService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
    this.roles$ = this.accountService.getRoles();

    this.route.params.subscribe(

      (params: any) => {
        this.user.id  = params['id'] == undefined ? 0 : params['id'];
        this.title = this.user.id == 0 ? "account.label.ADD" : "account.label.EDIT";
        this.accountService.getUser(this.user.id).subscribe((data) => {
          (this.user = data);

          this.f["userName"].setValue(this.user.userName);
          this.f["fullname"].setValue(this.user.fullname);
          this.f["email"].setValue(this.user.email);
          this.f["status"].setValue(this.user.status ? 1 : 0);
        });
      }
    );

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
      status: new FormControl(1, [Validators.required]),
      userRoleIds: new FormControl("", [Validators.required, Validators.min(1)]),
      userFacilityIds: new FormControl([] , [Validators.required, Validators.min(1)]),
    });


  }

  get f() {
    return this.oform.controls;
  }


  ngOnInit(): void {


  }

  onCancel() {
    this.router.navigate(['/account']);
  }

  submit() {
    this.submitted = true;
    this.user.email = this.oform.value.email;
    this.user.fullname = this.oform.value.fullname;
    this.user.userName = this.oform.value.userName;

    //this.user.laguangeId = this.oform.value.languageId;
    this.user.status = this.oform.value.status;
    //save User
    this.accountService.save(this.user).subscribe(
      () => {
        this.submitted = false;
        this.user.id != 0 ?
          this.toastr.success(
            this.formtranslate.getMsg("account.message.UPDATESUCESS")
          ) : this.toastr.success(
            this.formtranslate.getMsg("account.message.CREATESUCESS")
          );


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
              msg += `${this.formtranslate.getMsg("account.message." + element.toUpperCase())}|`
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
    );
  }

}
