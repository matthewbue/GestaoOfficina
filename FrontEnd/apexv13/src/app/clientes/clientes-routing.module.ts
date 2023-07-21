import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';
import { EditClientesComponent } from './edit-clientes/edit-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  {
    path: '',
    component: EditClientesComponent,
  }
]
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Full_ROUTES)

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule { }
