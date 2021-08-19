import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  type = 'phone';
  cartProducts: any[] = [];

  constructor(private http: HttpClient) {}

  create(product: any) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product).pipe(
      map((res: any) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date),
        };
      })
    );
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/products.json`).pipe(
      map((res: { [key: string]: any }) => {
        return Object.keys(res).map((key) => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date),
        }));
      })
    );
  }

  getById(id: string) {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`).pipe(
      map((res: { [key: string]: any }) => {
        return {
          ...res,
          id,
          date: new Date(res.date),
        };
      })
    );
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  update(product: any) {
    return this.http.patch(
      `${environment.fbDbUrl}/products/${product.id}.json`,
      product
    );
  }

  setType(type: string) {
    this.type = type;
  }

  addProduct(product: any) {
    this.cartProducts.push(product);
  }
}
