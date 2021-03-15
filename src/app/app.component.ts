import { Component } from '@angular/core';
import { Good } from './good/good';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'motlab-order';
  todo: Good[] = [
    {
      request_user: '栗田',
      product: '塩酸',
      order_number: 3,
      note: '特になし',
      company: '和光',
      product_number: 'aaa',
      quantity: '500 mL'
    },
    {
      request_user: '向',
      product: 'イソプロパノール',
      order_number: 1,
      note: '特になし',
      company: '和光',
      product_number: 'aaa',
      quantity: '500 mL'
    },
  ]
}
