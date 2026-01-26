import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { FormValidationsService } from 'app/shared/services/form-validations.service';
import { ToastrService } from 'ngx-toastr';
import { UsersApiService, UserResponseDTO } from '../users-api.service';
import { BaseFormComponent } from 'app/shared/base-form/base-form.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss',
    '../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent extends BaseFormComponent implements OnInit {
  photoPreviewUrl: string | null = null;
  private selectedPhotoBase64: string | null = null;

  get initials(): string {
    return this.getInitials(this.oform?.value?.name ?? this.user?.name);
  }

  private buildImageDataUrl(base64?: string | null): string | null {
    if (!base64) return null;

    const trimmed = String(base64).trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('data:')) {
      return trimmed;
    }

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

  user: UserResponseDTO = {
    id: 0,
    name: '',
    email: '',
    cpf: '',
    profile: 1,
    profileDescription: '',
    profilePhotoBase64: null,
  };

  profiles = [
    { id: 1, label: 'Administrador' },
    { id: 2, label: 'Operador' },
    { id: 3, label: 'Técnico' },
  ];

  constructor(public translate: TranslateService,
    public toastr: ToastrService,
    private formtranslate: FormValidationsService,
    private usersApi: UsersApiService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      this.user.id = params['id'] == undefined ? 0 : Number(params['id']);
      this.title = this.user.id == 0 ? 'account.label.ADD' : 'account.label.EDIT';

      if (this.user.id && this.user.id !== 0) {
        this.usersApi.getById(this.user.id).subscribe((result) => {
          this.user = result.data;
          this.f['cpf'].setValue(this.user.cpf);
          this.f['name'].setValue(this.user.name);
          this.f['email'].setValue(this.user.email);
          this.f['profile'].setValue(this.user.profile);

          this.photoPreviewUrl = this.buildImageDataUrl(this.user.profilePhotoBase64);
          this.selectedPhotoBase64 = null;
        });
      }
    });

    this.oform = new FormGroup({
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(200)]),
      profile: new FormControl(1, [Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(200)]),
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

  onPhotoSelected(event: Event): void {
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
      this.photoPreviewUrl = dataUrl;
      const commaIndex = dataUrl.indexOf(',');
      this.selectedPhotoBase64 = commaIndex >= 0 ? dataUrl.substring(commaIndex + 1) : dataUrl;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    this.submitted = true;
    const payload = {
      cpf: this.oform.value.cpf,
      name: this.oform.value.name,
      email: this.oform.value.email,
      profile: Number(this.oform.value.profile),
      password: this.oform.value.password,
    };

    const request$ = this.user.id && this.user.id !== 0
      ? this.usersApi.update({
          id: this.user.id,
          cpf: payload.cpf,
          name: payload.name,
          email: payload.email,
          profile: payload.profile,
          password: payload.password ? payload.password : null,
          profilePhoto: this.selectedPhotoBase64,
        })
      : this.usersApi.create({
          cpf: payload.cpf,
          name: payload.name,
          email: payload.email,
          profile: payload.profile,
          profilePhoto: this.selectedPhotoBase64,
        });

    request$.subscribe(
      () => {
        this.submitted = false;
        this.user.id != 0 ?
          this.toastr.success(
            this.formtranslate.getMsg("account.message.UPDATESUCESS")
          ) : this.toastr.success(
            this.formtranslate.getMsg("account.message.CREATESUCESS")
          );
        this.router.navigate(['/account']);
      },
      (err) => {
        this.submitted = false;
        if (err.status === 403) {
          this.toastr.warning(
            this.formtranslate.getMsg("account.message.UNAUTHORIZE")
          );
        }
        else {
          this.toastr.error(err?.error?.message ?? 'Erro ao salvar usuário');
        }

      }
    );
  }

}
