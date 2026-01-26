import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";

import { switchMap, take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { FormValidationsService } from "app/shared/services/form-validations.service";
import { ToastrService } from "ngx-toastr";
import { UsersApiService, UserResponseDTO } from "./users-api.service";
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

  // column header
  public columns = [];

  // private
  private tempData: UserResponseDTO[] = [];

  constructor(private usersApi: UsersApiService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formTranslate: FormValidationsService,
    private alertService: AlertModalService,
    private router: Router) {
    this.getUsers();

    //this.tempData = usersListData;
  }

  private getUsers() {
    this.usersApi.getAll().subscribe((result) => {
      const list = (result?.data ?? []) as UserResponseDTO[];
      this.rows = JSON.parse(JSON.stringify(list));
      this.tempData = JSON.parse(JSON.stringify(list));
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
      return (
        d.cpf?.toLowerCase().indexOf(val) !== -1 ||
        d.name?.toLowerCase().indexOf(val) !== -1 ||
        d.email?.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
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
  view(row: any) {
    this.router.navigate([`account/${row.id}`]);
  }
  new()
  {
    this.router.navigate(["account/new"]);
  }
  ngOnInit(): void { }

  remove(row: any) {
    const result$ = this.alertService.showConfirm(
      this.formTranslate.getMsg('account.showConfirmDeleteUser.TITLE'),
      `${this.formTranslate.getMsg('account.showConfirmDeleteUser.BODY')} ${row.name}`,
      this.formTranslate.getMsg('account.showConfirmDeleteUser.CONFIRM'),
      this.formTranslate.getMsg('account.showConfirmDeleteUser.CANCEL'),
      'btn btn-danger'
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.usersApi.delete(Number(row.id)) : EMPTY))
      )
      .subscribe(
        () => {
          this.toastr.success(this.formTranslate.getMsg('account.message.DELETESUCESS'));
          this.getUsers();
        },
        (err) => {
          if (err.status === 403) {
            this.toastr.warning(this.formTranslate.getMsg('account.message.UNAUTHORIZE'));
          } else {
            this.toastr.error(err.error != null ? err.error.message : err);
          }
        }
      );
  }
}
