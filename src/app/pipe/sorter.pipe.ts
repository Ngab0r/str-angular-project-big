import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], key: string, isAscending: boolean): any[] {

    if (typeof (value) === 'undefined' || !Array.isArray(value) || typeof (key) === 'undefined') { return value };

    const arr = key.split('.')[0].split('[')[0];
    const keyA = 'a' + "['" + arr + "']" + key.replace(arr, '');
    const keyB = 'b' + "['" + arr + "']" + key.replace(arr, '');

    return value.sort((a: any, b: any) => SorterPipe.compare(eval(keyA), eval(keyB), isAscending));
  }
  static compare(a: any, b: any, isAscending): number {
    if (typeof (a) === 'number' && typeof (b) === 'number') {
      return isAscending ? a - b : b - a;
    }
    else return isAscending ? a.toString().toLocaleLowerCase().localeCompare(b.toString().toLocaleLowerCase()) :
      b.toString().toLocaleLowerCase().localeCompare(a.toString().toLocaleLowerCase());
  }

}
