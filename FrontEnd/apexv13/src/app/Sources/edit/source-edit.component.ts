import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { FormValidationsService } from "app/shared/services/form-validations.service";
import { TranslateService } from "@ngx-translate/core";
import { latLng, tileLayer, Map as LeafletMap } from "leaflet";
import { parse } from 'wellknown';
import { geoJSON } from "leaflet";
import { Router } from "@angular/router";
import { Source } from "app/shared/Model/Source";
import { Facility } from "app/shared/Model/Facility";
import { Subfacility } from "app/shared/Model/Subfacility";
import { parseFileToWkt } from "app/shared/geo/parseFileToWkt";
import { OriginService } from "app/Origin/origin.service";
import { OriginClassification } from "app/shared/Model/OriginClassification";
import { ClassificationMethodService } from "app/ClassificationMethod.ts/classification-method.service";
import { ClassificationMethod } from "app/shared/Model/ClassificationMethod";
import { CrudService } from "app/shared/crud/CrudService";
import { CrudServiceFactory } from "app/shared/crud/CrudServiceFactory";
import { SourcesService } from "../sources.services"
import { SourceCause } from "app/shared/Model/SourceCause";
import { SourceCauseService } from "app/SourceCause/source-cause.service";

declare var shp: any

@Component({
  selector: 'app-users-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss',
    '../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SourceEditComponent implements OnInit {
  private facilityService: CrudService<Facility>;
  private subfacilitiesService: CrudService<Subfacility>;

  constructor(
    public translate: TranslateService,
    public toastr: ToastrService,
    private formtranslate: FormValidationsService,
    private crudServiceFactory: CrudServiceFactory,
    private classificationMethodServices: ClassificationMethodService,
    private originServices: OriginService,
    private router: Router,
    private sourceService: SourcesService,
    private sourceCauseService: SourceCauseService
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "pt");
    this.facilityService = this.crudServiceFactory.createService<Facility>("facilities");
    this.subfacilitiesService = this.crudServiceFactory.createService<Subfacility>("subfacilities");
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    zoomControl: true,
    center: latLng(-21.879966, -45.726909),
    dragging: true,
    scrollWheelZoom: false,
    doubleClickZoom: true
  };

  model: Source;
  facilities: Facility[] = [];
  subFacilities: Subfacility[] = [];
  sourceCauses: SourceCause[] = [];
  classfications: OriginClassification[] = [];
  methods: ClassificationMethod[] = [];
  geometry: any;
  map: LeafletMap;
  isDetail: boolean = false;
  time: any;

  ngOnInit(): void {
    this.model = new Source();
    this.model.valueChanged = (property, newValue) => {
      if (property === 'wkt' && newValue) {
        this.geometry = geoJSON(parse(newValue));
        this.map.fitBounds(this.geometry.getBounds());
      }
    }

    this.isDetail = this.router.url.split("/").pop() === 'details';

    this.facilityService
      .getAll()
      .subscribe(data => {
        this.facilities = data;
      });

    this.originServices
      .getAll()
      .subscribe(data => {
        this.classfications = data;
      })

    this.classificationMethodServices
      .getAll()
      .subscribe(data => {
        this.methods = data;
      })

      this.sourceCauseService
      .getAll()
      .subscribe(data => {
        this.sourceCauses = data;
      })
  }

  save(form: NgForm) {

    if (form.invalid) {
      this.toastr.error(this.formtranslate.getMsg("facilities.message.CHECK_REQUIRED_FIELDS"));
      return;
    }

    if (!this.model.wkt) {
      this.toastr.error(this.formtranslate.getMsg("facilities.message.FACILITY_GEOMETRY_REQUIRED"));
      return;
    }

    this
      .sourceService
      .save(this.model)
      .subscribe((res: any) => {
        this.router.navigate(['/sources']);
        this.toastr.success(res.message);
      }, error => {
        this.toastr.error(error);
      })
  }

  onMapReady(map: LeafletMap) {
    this.map = map;
  }

  parseWkt(event: any) {
    const file = event.target.files[0];
    parseFileToWkt(file)
      .then(wkt => this.model.wkt = wkt);
  }

  filterSubfacilities(idFacility: number): void {
    this.subfacilitiesService
      .getAll(`getAllByFacility/${idFacility}`)
      .subscribe(data => {
        this.subFacilities = data
      });
  }

  back() {
    this.router.navigate(['/sources']);
  }
}