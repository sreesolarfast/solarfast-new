import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderprogressComponent } from './orderprogress.component';

describe('OrderprogressComponent', () => {
  let component: OrderprogressComponent;
  let fixture: ComponentFixture<OrderprogressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderprogressComponent]
    });
    fixture = TestBed.createComponent(OrderprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
