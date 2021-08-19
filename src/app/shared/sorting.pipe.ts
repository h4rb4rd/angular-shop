import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting',
})
export class SortingPipe implements PipeTransform {
  transform(products: any[], type = ''): any {
    return products.filter((product: any) => {
      return product.type === type;
    });
  }
}
