import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdetailsentryformComponent } from './customerdetailsentryform.component';

describe('CustomerdetailsentryformComponent', () => {
  let component: CustomerdetailsentryformComponent;
  let fixture: ComponentFixture<CustomerdetailsentryformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerdetailsentryformComponent]
    });
    fixture = TestBed.createComponent(CustomerdetailsentryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
