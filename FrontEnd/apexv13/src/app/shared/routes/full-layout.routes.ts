import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EditClientesComponent } from 'app/clientes/edit-clientes/edit-clientes.component';
import { EditOrdemdeservicoComponent } from 'app/ordemdeservico/edit-ordemdeservico/edit-ordemdeservico.component';



//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'page',
    loadChildren: () => import('../../page/page.module').then(m => m.PageModule),

  },
  {
    path: 'ordemdeservico',
    loadChildren: () => import('../../ordemdeservico/ordemdeservico.module').then(m => m.OrdemdeservicoModule),

  },
  {
    path: 'orcamento',
    loadChildren: () => import('../../orcamento/orcamento.module').then(m => m.OrcamentoModule),
  },
  {
    path: 'clientes',
    loadChildren: () => import('../../clientes/clientes.module').then(m => m.ClientesModule),
  },

  {
    path: 'account',
    loadChildren: () => import('../../Account/account-module').then(m => m.AccountModule)
  },
  {
    path: 'clientes/new', component: EditClientesComponent
  },
  {
    path: 'ordemdeservico/new', component: EditOrdemdeservicoComponent
  },




];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Full_ROUTES);


