import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemdeservicoRoutingModule } from './ordemdeservico-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';
import { EditOrdemdeservicoComponent } from './edit-ordemdeservico/edit-ordemdeservico.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditOrdemdeservicoComponent
  ],
  imports: [SharedModule, OrdemdeservicoRoutingModule, NgSelectModule, ReactiveFormsModule],
})
export class OrdemdeservicoModule { }
