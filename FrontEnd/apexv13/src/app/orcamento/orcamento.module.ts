import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [],
  imports: [SharedModule, OrcamentoRoutingModule, NgSelectModule],
})
export class OrcamentoModule { }
