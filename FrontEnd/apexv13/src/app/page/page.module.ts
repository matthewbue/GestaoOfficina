import { NgModule } from "@angular/core";

import { SharedModule } from "./../shared/shared.module";
import { PageRoutingModule } from "./page-routing.module";
import { PageComponent } from "./page.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { AcconutSettingsComponent } from "./setting/account-settings.component";
import { ChartistModule } from "ng-chartist";
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [SharedModule, PageRoutingModule, NgSelectModule, ChartistModule, NgApexchartsModule],
  exports: [],
  declarations: [PageComponent, AcconutSettingsComponent],
  providers: [],
})
export class PageModule {}
