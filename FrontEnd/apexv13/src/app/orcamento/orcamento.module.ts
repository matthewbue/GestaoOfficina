import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditOrcamentoComponent } from './edit-orcamento/edit-orcamento.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EditOrcamentoComponent
  ],
  imports: [SharedModule, OrcamentoRoutingModule, NgSelectModule, NgSelectModule, ReactiveFormsModule],
})
export class OrcamentoModule { }
