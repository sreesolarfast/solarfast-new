import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderconfirmationComponent } from './orderconfirmation.component';

describe('OrderconfirmationComponent', () => {
  let component: OrderconfirmationComponent;
  let fixture: ComponentFixture<OrderconfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderconfirmationComponent]
    });
    fixture = TestBed.createComponent(OrderconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
