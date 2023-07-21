import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { AcconutSettingsComponent } from './setting/account-settings.component';


const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    data: {
      title: 'Page'
    }
    // children: [
    //   {
    //     path: 'page',
    //     component: PageComponent,
    //     data: {
    //       title: 'Page'
    //     }
    //   }
    // ]


  },
  {
    path: 'setting',
    component: AcconutSettingsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule { }
