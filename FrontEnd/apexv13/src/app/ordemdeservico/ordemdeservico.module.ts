import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';
import { EditOrdemdeservicoComponent } from './edit-ordemdeservico/edit-ordemdeservico.component';
import { OrdemdeservicoRoutingModule } from './ordemdeservico-routing.module';

@NgModule({
  declarations: [
    EditOrdemdeservicoComponent
  ],
  imports: [SharedModule, OrdemdeservicoRoutingModule, NgSelectModule, ReactiveFormsModule]
})
export class OrdemdeservicoModule { }
