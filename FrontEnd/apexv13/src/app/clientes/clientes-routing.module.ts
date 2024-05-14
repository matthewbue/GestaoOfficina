import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';
import { ClientesComponent } from './clientes.component';
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
