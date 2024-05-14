import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Full_ROUTES } from 'app/shared/routes/full-layout.routes';
import { EditOrcamentoComponent } from './edit-orcamento/edit-orcamento.component';
import { OrcamentoComponent } from './orcamento.component';

const routes: Routes = [
  {
    path: '',
    component: OrcamentoComponent,
  },
  {
    path: '',
    component: EditOrcamentoComponent,
  },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Full_ROUTES)

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrcamentoRoutingModule { }
