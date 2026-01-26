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
