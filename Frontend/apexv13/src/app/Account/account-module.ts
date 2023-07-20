import { SharedModule } from 'app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'app/shared/pipes/pipe.module';
import { AcconutSettingsComponent } from '../page/setting/account-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgSelectModule } from '@ng-select/ng-select';
import { UsersRoutingModule } from './account-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AccountComponent} from './account.component';
import { UserEditComponent } from './edit/user-edit.component';
import { SelectComponent } from './select/select.component';


@NgModule({
  imports: [
    SharedModule,
    NgxDatatableModule,
    UsersRoutingModule,
    NgSelectModule

  ],
  declarations: [AccountComponent, UserEditComponent, SelectComponent]
})
export class AccountModule { }
