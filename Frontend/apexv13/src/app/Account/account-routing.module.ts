import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './edit/user-edit.component';
import { AccountComponent } from './account.component';
import { AcconutSettingsComponent } from '../page/setting/account-settings.component';
import { SelectComponent } from './select/select.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    // children: [{
    //   path: ':id/edit', component: UserEditComponent

    // }]

  },

  {
    path: ':id/edit',
    component: UserEditComponent,
  },

  {
    path: 'new',
    component: UserEditComponent,
  },

  // {
  //   path: 'select',
  //   component: SelectComponent,
  // }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
