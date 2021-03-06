import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  products: any[] = [];
  productSub!: Subscription;
  removeSub!: Subscription;
  productName = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productSub = this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.removeSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
