import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { UsersApiService, UserResponseDTO } from '../users-api.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserViewComponent implements OnInit {
  user: UserResponseDTO = {
    id: 0,
    name: '',
    email: '',
    cpf: '',
    profile: 0,
    profileDescription: '',
    profilePhotoBase64: null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersApi: UsersApiService,
  ) {}

  get profilePhotoUrl(): string | null {
    return this.buildImageDataUrl(this.user?.profilePhotoBase64);
  }

  get initials(): string {
    return this.getInitials(this.user?.name);
  }

  private buildImageDataUrl(base64?: string | null): string | null {
    if (!base64) return null;

    const trimmed = String(base64).trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('data:')) {
      return trimmed;
    }

    // remove whitespace/newlines that can break base64
    const clean = trimmed.replace(/\s+/g, '');

    // best-effort mime detection by signature
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

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      const id = Number(params['id']);
      if (!id || Number.isNaN(id)) {
        this.router.navigate(['/account']);
        return;
      }

      this.usersApi.getById(id).pipe(take(1)).subscribe({
        next: (result) => (this.user = result.data),
        error: () => this.router.navigate(['/account']),
      });
    });
  }

  back(): void {
    this.router.navigate(['/account']);
  }

  edit(): void {
    this.router.navigate([`/account/${this.user.id}/edit`]);
  }
}
