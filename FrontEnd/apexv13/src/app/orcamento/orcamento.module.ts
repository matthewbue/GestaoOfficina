import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';
import { EditOrcamentoComponent } from './edit-orcamento/edit-orcamento.component';
import { OrcamentoRoutingModule } from './orcamento-routing.module';



@NgModule({
  declarations: [
    EditOrcamentoComponent
  ],
  imports: [SharedModule, OrcamentoRoutingModule, NgSelectModule, NgSelectModule, ReactiveFormsModule],
})
export class OrcamentoModule { }
