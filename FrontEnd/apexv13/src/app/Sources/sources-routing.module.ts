import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SourceEditComponent } from './edit/source-edit.component';
import { ListingSourcesComponent } from './listing/listing.component'

const routes: Routes = [
  {
    path: '',
    component: ListingSourcesComponent,
  },
  {
    path: ':id',
    component: SourceEditComponent,
  },
  {
    path: ':id/details',
    component: SourceEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacilitiesRountingModule { }
