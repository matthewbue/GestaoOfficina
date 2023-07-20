import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { switchMap, take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { User } from "app/shared/Model/user";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { FormValidationsService } from "app/shared/services/form-validations.service";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "./account.service";
import { usersListData } from "./data/users-list.data";
import { EMPTY } from "rxjs";
import { ModalDirective, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: [
    "./account.component.scss",
    "./../../assets/sass/libs/datatables.scss",
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(ModalDirective, { static: true }) modal: ModalDirective;

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  user: User = new User();

  // column header
  public columns = [
    { name: "Id", prop: "ID" },
    { name: "UserName", prop: "UserName" },
    { name: "FullName", prop: "firstName" },
    { name: "Role", prop: "Role" },
    { name: "Status", prop: "Status" },
    { name: "Actions", prop: "Actions" },
  ];

  // private
  private tempData = [];

  constructor(private accountService: AccountService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formTranslate: FormValidationsService,
    private alertService: AlertModalService,
    private router: Router) {
    this.getUsers();

    //this.tempData = usersListData;
  }

  private getUsers() {
    this.accountService.getAll().subscribe((data) => {
        this.rows = JSON.parse(JSON.stringify(data));
      this.tempData = JSON.parse(JSON.stringify(data));
    });
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
        return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }
  edit(row: any) {
    this.router.navigate([`account/${row.id}/edit`]);
  }
  new()
  {
    this.router.navigate(["account/new"]);
  }
  ngOnInit(): void { }
  reset(row : any) {

    const result$ = this.alertService.showConfirm(
      this.formTranslate.getMsg("account.showConfirmResetPassword.TITLE"),
      `${this.formTranslate.getMsg(
        "account.showConfirmResetPassword.BODY"
      )} ${row.fullname}`,
      this.formTranslate.getMsg("account.showConfirmResetPassword.CONFIRM"),
      this.formTranslate.getMsg("account.showConfirmResetPassword.CANCEL"),
      "btn btn-primary"
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.accountService.resetPassword(row.id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.toastr.success(
            this.formTranslate.getMsg("account.message.RESETPASSSUCESS")
          );
        },
        (err) => {
          if (err.status === 403) {
            this.toastr.warning(
              this.formTranslate.getMsg("account.message.UNAUTHORIZE")
            );
          } else {
            this.toastr.error(err.error != null ? this.formTranslate.getMsg("configuration.itemcost.error.FOREIGNKEY"): err.error );
          }

        }
      );
  }


}
