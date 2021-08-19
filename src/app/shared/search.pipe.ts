import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: any[], productName = ''): any {
    if (!productName.trim()) {
      return products;
    }

    return products.filter((product: any) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }
}
