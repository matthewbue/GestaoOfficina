import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { switchMap, take } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { FormValidationsService } from "app/shared/services/form-validations.service";
import { ToastrService } from "ngx-toastr";
import { UsersApiService, UserResponseDTO } from "./users-api.service";
import { EMPTY } from "rxjs";
import { ModalDirective, BsModalService } from "ngx-bootstrap/modal";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

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

  creating = false;
  createFormSubmitted = false;
  private createModalRef?: NgbModalRef;

  createPhotoPreviewUrl: string | null = null;
  private createPhotoBase64: string | null = null;

  createForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(200)]),
    cpf: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
    profile: new FormControl(2, [Validators.required]),
  });

  // row data
  public rows = [];
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [];

  // private
  private tempData: Array<UserResponseDTO & { profilePhotoUrl?: string | null; initials?: string }> = [];

  private buildImageDataUrl(base64?: string | null): string | null {
    if (!base64) return null;

    const trimmed = String(base64).trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('data:')) return trimmed;

    const clean = trimmed.replace(/\s+/g, '');

    let mime = 'image/jpeg';
    if (clean.startsWith('iVBORw0KGgo')) mime = 'image/png';
    else if (clean.startsWith('/9j/')) mime = 'image/jpeg';
    else if (clean.startsWith('R0lGOD')) mime = 'image/gif';
    else if (clean.startsWith('UklGR')) mime = 'image/webp';
    else if (clean.startsWith('Qk')) mime = 'image/bmp';

    return `data:${mime};base64,${clean}`;
  }

  private getInitials(name?: string | null): string {
    const safe = String(name ?? '').trim();
    if (!safe) return '??';
    const parts = safe.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : '') ?? '';
    return (first + last).toUpperCase() || '??';
  }

  private mapUserRow(user: UserResponseDTO) {
    return {
      ...user,
      profilePhotoUrl: this.buildImageDataUrl(user.profilePhotoBase64 ?? null),
      initials: this.getInitials(user.name),
    };
  }

  constructor(private usersApi: UsersApiService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private formTranslate: FormValidationsService,
    private alertService: AlertModalService,
    private modalService: NgbModal,
    private router: Router) {
    this.getUsers();

    //this.tempData = usersListData;
  }

  private getUsers() {
    this.usersApi.getAll().subscribe((result) => {
      const list = (result?.data ?? []) as UserResponseDTO[];
      const mapped = list.map((u) => this.mapUserRow(u));
      this.rows = JSON.parse(JSON.stringify(mapped));
      this.tempData = JSON.parse(JSON.stringify(mapped));
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
  openCreateModal(content: any) {
    this.createFormSubmitted = false;
    this.createForm.reset({
      name: "",
      email: "",
      cpf: "",
      profile: 2,
    });

    this.createPhotoPreviewUrl = null;
    this.createPhotoBase64 = null;

    this.createModalRef = this.modalService.open(content, {
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  onCreatePhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    if (!file) return;

    if (!file.type || !file.type.startsWith('image/')) {
      this.toastr.warning('Selecione um arquivo de imagem (JPG/PNG/GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? '');
      this.createPhotoPreviewUrl = dataUrl;
      const commaIndex = dataUrl.indexOf(',');
      this.createPhotoBase64 = commaIndex >= 0 ? dataUrl.substring(commaIndex + 1) : dataUrl;
    };
    reader.readAsDataURL(file);
  }

  submitCreate(modal?: NgbModalRef) {
    this.createFormSubmitted = true;
    if (this.createForm.invalid) return;

    this.creating = true;
    const { name, email, cpf, profile } = this.createForm.value;
    const normalizedCpf = String(cpf ?? "").replace(/\D/g, "");

    this.usersApi
      .create({
        name: String(name ?? "").trim(),
        email: String(email ?? "").trim(),
        cpf: normalizedCpf,
        profile: Number(profile ?? 2),
        profilePhoto: this.createPhotoBase64,
      })
      .subscribe({
        next: (result) => {
          this.creating = false;

          if (!result?.data?.id) {
            this.toastr.error(result?.message || "Não foi possível criar o usuário.");
            return;
          }

          this.toastr.success(this.formTranslate.getMsg("account.message.CREATESUCESS"));
          (modal ?? this.createModalRef)?.close();
          this.getUsers();
        },
        error: (err) => {
          this.creating = false;
          const apiMessage = err?.error?.message;
          this.toastr.error(apiMessage || "Erro ao criar usuário. Tente novamente.");
        },
      });
  }

  new() {
    // Mantido por compatibilidade; a criação agora é via modal.
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
