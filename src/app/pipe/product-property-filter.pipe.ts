import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Pipe({
  name: 'productPropertyFilter'
})
export class ProductPropertyFilterPipe implements PipeTransform {


  constructor(private config: ConfigService) { }

  transform(properties: string[], filterFunction: string) {
    switch (filterFunction) {
      case 'search':
        return properties.filter(item => this.config.searchByProperties.includes(item));

      case 'order':
        return properties.filter(item => this.config.orderByProperties.includes(item));

      case 'admin':
        return properties.filter(item => true);

      default:
        return properties;
    }
  }

}
