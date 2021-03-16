import { Component, Input, OnInit } from '@angular/core';
import { Good } from '../good/good'

@Component({
  selector: 'app-order-doc',
  templateUrl: './order-doc.component.html',
  styleUrls: ['./order-doc.component.css']
})
export class OrderDocComponent implements OnInit {
  @Input() good: Good;
  constructor() { }

  ngOnInit(): void {
  }

}
