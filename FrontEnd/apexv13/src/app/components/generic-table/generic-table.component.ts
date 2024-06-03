// generic-table.component.ts
import { Component, Input, OnInit, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent
} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericTableComponent implements OnInit {
  @Input() title: string;
  @Input() columns: Array<{ name: string, prop: string, width?: number, template?: TemplateRef<any> }>;
  @Input() rows: any[];
  @Input() actionTemplate: TemplateRef<any>;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor() {}

  ngOnInit() {}

  rowDetailsToggleExpand(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }
}
