import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";

export class NgbTime implements NgbTimeStruct {
  constructor(public hour: number, public minute: number, public second: number = 0) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
}