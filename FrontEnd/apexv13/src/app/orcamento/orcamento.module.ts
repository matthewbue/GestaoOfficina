import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditOrcamentoComponent } from './edit-orcamento/edit-orcamento.component';



@NgModule({
  declarations: [
    EditOrcamentoComponent
  ],
  imports: [SharedModule, OrcamentoRoutingModule, NgSelectModule],
})
export class OrcamentoModule { }
