import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GOODS } from './mock-goods'
import { Good } from '../good/good'

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {
  goods = GOODS;
  search : Good = {
    request_user: '',
    product: '',
    order_number: 1,
    note: '',
    company: '',
    product_number: '',
    quantity: '',
  };
  search_result: Good[] = [];
  err_message: string = '';

  onSearch(): void {
    this.search_result.length = 0;
    this.err_message = '';
    for (let item of this.goods) {
      if (this.search.company.length > 0){
        if (item.company.match(this.search.company)) {
          this.search_result.push(item);
        }
      }

      if (this.search.product.length > 0) {
        if (item.product.match(this.search.product)) {
          this.search_result.push(item);
        }
      }
    }
    if (this.search_result.length == 0) {
      this.err_message = '一致する検索結果がありません';
    }
  }

  onSelect(good: Good): void {
    this.data.good.product = good.product;
    this.data.good.product_number = good.product_number;
    this.data.good.order_number = good.order_number;
    this.data.good.company = good.company;
    this.data.good.quantity = good.quantity;

  }

  onCheck(): void {
    console.log(this.data.good)
  }

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SearchDialogData
  ) { }

  ngOnInit(): void {
  }

}

export interface SearchDialogData {
  good: Partial<Good>;
  enableDelete: boolean;
}

export interface SearchDialogResult {
  good: Good;
  delete?: boolean;
}
