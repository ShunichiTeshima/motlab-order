import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDocComponent } from './order-doc.component';

describe('OrderDocComponent', () => {
  let component: OrderDocComponent;
  let fixture: ComponentFixture<OrderDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
