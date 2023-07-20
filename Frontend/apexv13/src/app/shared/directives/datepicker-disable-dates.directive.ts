import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Directive({
  selector: '[appDatepickerDisableDates]'
})
export class DatepickerDisableDatesDirective {
  @Input() appDatepickerDisableDates: Date[];

  constructor(private ngControl: NgControl) { }

  setBsDatepickerConfig(config: BsDatepickerConfig) {
    config.datesDisabled = this.appDatepickerDisableDates;
  }

  ngOnInit() {
    const config = this.ngControl.valueAccessor!["_datepicker"]._config;
    this.setBsDatepickerConfig(config);
  }
}
