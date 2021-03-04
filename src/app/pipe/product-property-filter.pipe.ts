import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../service/config.service';
import { Columns } from '../model/columns';

@Pipe({
  name: 'productPropertyFilter'
})
export class ProductPropertyFilterPipe implements PipeTransform {


  constructor() { }

  transform(properties: Columns[], filterFunction: string) {
    switch (filterFunction) {
      case 'order':
        return properties.filter(item => item.name !== 'productID' && item.name !== 'quantity');

      case 'admin':
        return properties.filter(item => true);

      default:
        return properties;
    }
  }

}
