import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';
import { ClientesRoutingModule } from './clientes-routing.module';
import { EditClientesComponent } from './edit-clientes/edit-clientes.component';



@NgModule({
  declarations: [
    EditClientesComponent
  ],
  imports: [
    SharedModule,
    ClientesRoutingModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
