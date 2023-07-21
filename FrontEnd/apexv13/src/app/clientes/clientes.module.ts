import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditClientesComponent } from './edit-clientes/edit-clientes.component';



@NgModule({
  declarations: [
    EditClientesComponent
  ],
  imports: [
    SharedModule,
    ClientesRoutingModule,
    NgSelectModule
  ]
})
export class ClientesModule { }
