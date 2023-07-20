import { ToastrModule } from "ngx-toastr";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// import { AngularFireModule } from "@angular/fire";
// import { AngularFireAuthModule } from "@angular/fire/auth";

import { NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader, TranslateStore, TranslateService } from "@ngx-translate/core";
// import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// import { NgxSpinnerModule } from "ngx-spinner";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgSelectModule } from "@ng-select/ng-select";
import * as L from "leaflet";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";

import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { WINDOW_PROVIDERS } from "./shared/services/window.service";
import { AuthInterceptor } from "./shared/auth/auth.interceptor";
import { BrDateParserFormatter } from "./shared/adapters/BrDateParserFormatter";
import { CrudServiceFactory } from "./shared/crud/CrudServiceFactory";
import { CrudService } from "./shared/crud/CrudService";
import { CalendarModule,DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserModule } from "@angular/platform-browser";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { OrdemdeservicoComponent } from './ordemdeservico/ordemdeservico.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { ClientesComponent } from './clientes/clientes.component';


L.Icon.Default.prototype.options.shadowUrl =
  "assets/img/map/leaflet/marker-shadow.png";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, OrdemdeservicoComponent, OrcamentoComponent, ClientesComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    // AngularFireAuthModule,
    ToastrModule.forRoot(),
    NgbModule,
    LeafletModule,
    NgSelectModule,
    PerfectScrollbarModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,

    CrudService,
    CrudServiceFactory,


    { provide: NgbDateParserFormatter, useClass: BrDateParserFormatter },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    WINDOW_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
