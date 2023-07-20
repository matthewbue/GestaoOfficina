import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';
import { OrcamentoComponent } from './orcamento.component';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoComponent,
  },

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Full_ROUTES)

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentoRoutingModule { }
