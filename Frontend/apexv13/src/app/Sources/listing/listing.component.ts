import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Source } from "app/shared/Model/Source";
import { Pagination } from "app/shared/Model/Pagination";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { FormValidationsService } from "app/shared/services/form-validations.service";
import { ToastrService } from "ngx-toastr";
import { EMPTY } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { CrudServiceFactory } from "app/shared/crud/CrudServiceFactory";
import { CrudService } from "app/shared/crud/CrudService";
import { Facility } from "app/shared/Model/Facility";
import { Subfacility } from "app/shared/Model/Subfacility";

@Component({
  selector: 'listing-sources',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss',
    '../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListingSourcesComponent implements OnInit {

  private sourcesService: CrudService<Source>;
  private facitlitesService: CrudService<Facility>;
  private subFacilitiesService: CrudService<Subfacility>;
  
  constructor(
    private router: Router,
    private alertModalService: AlertModalService,
    private toastr: ToastrService,
    private formTranslate: FormValidationsService,
    private crudServiceFactory: CrudServiceFactory
  ) {
    this.sourcesService = this.crudServiceFactory.createService<Source>("Fonte");
    this.facitlitesService = this.crudServiceFactory.createService<Facility>("facilities");
    this.subFacilitiesService = this.crudServiceFactory.createService<Subfacility>("subfacilities");
  }

  sources: any = [];
  facilities: Facility[] = [];
  subFacilities: Subfacility[] = [];
  searchTerm: string;
  sourceName: string = "";
  sourceCode: string = "";
  pagination: Pagination = new Pagination(1, 1, 0);
  selectedSubfacilities: any;
  selectedFacilities: any;
  query = {
    "facilities": [],
    "subFacilities": [],
    "nomeFonte": "",
    "codigoPersonalizado": "",
   
    "pagina": 1
    
  }

  ngOnInit() {
    this.facitlitesService
      .getAll()
      .subscribe(data => {
        this.facilities = data;
      });
      
    this.sourcesService
      .filter(1, this.query, 'getFontes')
      .subscribe((data: any) => {
      this.sources = data;
      console.log(this.sources);
    });


  }

  new() {
    this.router.navigate(["sources/new"]);
  }

  edit(source) {
    this.router.navigate([`sources/${source.id}`]);
  }

  delete(source:Source) {
    const result = this.alertModalService
      .showConfirm(
        this.formTranslate.getMsg("ATTENTION"), 
        this.formTranslate.getMsg("facilities.message.FACILITY_CONFIRM_DELETION"), 
        this.formTranslate.getMsg("YES"), 
        this.formTranslate.getMsg("NO")
      )
      result
        .asObservable()
        .pipe(
         take(1),
          switchMap((result) =>
            result ? this.sourcesService.delete(source) : EMPTY
          )
        )
        .subscribe(
          () => {
            this.toastr.success(
              this.formTranslate.getMsg("facility.message.FACILITY_DELETED")
            );
          },
          (err) => {
            if (err.status === 403) {
              this.toastr.warning(
                this.formTranslate.getMsg("facility.message.UNAUTHORIZE")
              );
            } else {
              this.toastr.error(err.error);
            }
          }
        );      
  }

  search() {
    this.setNameAndCode();
    this.sourcesService
      .filter(1, this.query, 'getFontes')
      .subscribe((data: any) => {
      this.sources = data;
    });
  }

  managePictures(source:Source) {

  }

  manageState(source: any) {
    this.router.navigate([`source-status`], {queryParams: {sourceId: source.id, sourceCode: source.codigoPersonalizado}});
  }

  newActionPlan(source: any) {
    this.router.navigate([`action-plans`], {queryParams: {sourceId: source.id, sourceCode: source.codigoPersonalizado}});
  }

  filterSubfacilities(idFacility: number): void {

    if (idFacility) {
      this.setFacilityId(idFacility);

      this.subFacilitiesService
        .getAll(`getAllByFacility/${idFacility}`)
        .subscribe(data => {
          this.subFacilities = data
        });
      
      this.clearSubfacilities();
    }
   
  } 
  
  setFacilityId = (value: number) =>  {
    if (value) {
      this.query.facilities = [value];
    }

    else this.query.facilities = [];
  }
  
  setSubFacilitiesId = (values) => this.query.subFacilities = values;

  setFacilitiesId = (value) => this.query.facilities = value;
  
  setNameAndCode = () => {
    this.query.codigoPersonalizado = this.sourceCode;
    this.query.nomeFonte = this.sourceName;
  }

  changePage = (page) => {
    this.query.pagina = page.offset + 1;

    this.sourcesService
      .filter(1, this.query, 'getFontes')
      .subscribe((data: any) => {
      this.sources = data;
    });
  }

  clearFilters = () => {
    this.sourceName = "";
    this.sourceCode = "";

    this.clearFacilities();
  }

  clearFacilities = () => {
    this.selectedFacilities = [];
    this.setFacilitiesId(this.selectedFacilities);

    this.clearSubfacilities();
  }

  clearSubfacilities = () => {
    this.selectedSubfacilities = [];
    this.setSubFacilitiesId(this.selectedSubfacilities);
    this.subFacilities = [];
  }
}