import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {
  transform(fullname: string): any {
    return fullname
      .split(' ')
      .map((n) => n[0])
      .join('');
  }
}
