import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Good } from './good'

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.css']
})
export class GoodComponent implements OnInit {
  @Input() good: Good;
  @Output() edit = new EventEmitter<Good>();
  constructor() { }

  ngOnInit(): void {
  }

}
