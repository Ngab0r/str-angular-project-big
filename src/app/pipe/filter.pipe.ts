import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  transform(value: any[], phrase: string, key: string = '', phrase2?: string): any {
    if (!Array.isArray(value) || !phrase || !key) {
      return value;
    }

    if (key === 'price') {
      if (!isNaN(parseInt(phrase)) || !isNaN(parseInt(phrase2))) {
        if (!isNaN(parseInt(phrase)) && !isNaN(parseInt(phrase2))) {
          return value.filter(item => parseInt(phrase) <= parseInt(item[key]) && parseInt(phrase2) >= parseInt(item[key]));
        }
        if (!isNaN(parseInt(phrase))) {
          return value.filter(item => parseInt(phrase) <= parseInt(item[key]));
        }
        if (!isNaN(parseInt(phrase2))) {
          return value.filter(item => parseInt(phrase2) >= parseInt(item[key]));
        }
      }
      else {
        return value;
      }
    }


    phrase = phrase.toLowerCase();
    return value.filter(item => item[key].toString().toLowerCase().includes(phrase));

  }
}
