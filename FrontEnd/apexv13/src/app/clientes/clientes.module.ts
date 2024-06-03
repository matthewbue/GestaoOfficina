import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ClientesRoutingModule } from './clientes-routing.module';
import { EditClientesComponent } from './edit-clientes/edit-clientes.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    EditClientesComponent
  ],
  imports: [
    SharedModule,
    ClientesRoutingModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    NgxDatatableModule
  ]
})
export class ClientesModule { }
