import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
})
export class OrdersPageComponent implements OnInit {
  orders: any[] = [];
  orderSub!: Subscription;
  removeSub!: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderSub = this.orderService.getAll().subscribe((orders) => {
      this.orders = orders;
    });
  }
  ngOnDestroy() {
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.removeSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter((order) => order.id !== id);
    });
  }
}
