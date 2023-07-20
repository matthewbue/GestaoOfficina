import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FacilitiesRountingModule } from './sources-routing.module';
import { ListingSourcesComponent } from './listing/listing.component';
import { SourceEditComponent } from './edit/source-edit.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    SharedModule,
    NgxDatatableModule,
    FacilitiesRountingModule,
    NgSelectModule,
    TagInputModule,
    LeafletModule
  ],
  declarations: [ListingSourcesComponent, SourceEditComponent]
})
export class SourcesModule { }
