import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdemdeservicoComponent } from './ordemdeservico.component';
import { RouterModule, Routes } from '@angular/router';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';

const routes: Routes = [
  {
    path: '',
    component: OrdemdeservicoComponent,
  },

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Full_ROUTES)

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemdeservicoRoutingModule { }
