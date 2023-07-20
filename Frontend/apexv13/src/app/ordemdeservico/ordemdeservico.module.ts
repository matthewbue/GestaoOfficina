import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemdeservicoRoutingModule } from './ordemdeservico-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, OrdemdeservicoRoutingModule, NgSelectModule],
})
export class OrdemdeservicoModule { }
